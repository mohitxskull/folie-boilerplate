import { BadRequestException, ForbiddenException } from '@localspace/package-backend-lib/exception'
import vine from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'
import { CustomerEMailS, CustomerNameS, CustomerPasswordS } from '#validators/customer'
import { setting } from '#config/setting'
import Credential from '#models/credential'
import { CredentialTypeT } from '#validators/index'
import { dbRef } from '#database/reference'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { UserTransformer } from '#transformers/user'

export const input = vine.compile(
  vine.object({
    name: CustomerNameS(),
    email: CustomerEMailS(),
    password: CustomerPasswordS(),
    confirmPassword: CustomerPasswordS().sameAs('password'),
  })
)

export default class Controller {
  async handle(ctx: HttpContext) {
    if (!setting.customer.signUp.active) {
      throw new ForbiddenException('Customer sign-up is disabled')
    }

    const payload = await ctx.request.validateUsing(input)

    const credential = await Credential.findBy({
      [dbRef.credential.identifierC]: payload.email,
      [dbRef.credential.typeC]: 'email' as CredentialTypeT,
    })

    if (credential) {
      throw new BadRequestException('Invalid credentials', {
        source: 'email',
        reason: 'Email not found',
      })
    }

    const trx = await db.transaction()

    try {
      const user = await User.create({
        name: payload.name,
      })

      await user.related('credentials').create({
        type: 'email',
        identifier: payload.email,
        password: payload.password,
      })

      await trx.commit()

      return { user: await ctx.transformArray([user], UserTransformer, 'default') }
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
