import { BadRequestException, ForbiddenException } from '@localspace/node-lib/exception'
import vine from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'
import { CustomerEMailS, CustomerPasswordS } from '#validators/customer'
import { setting } from '#config/setting'
import Credential from '#models/credential'
import { CredentialTypeT } from '#validators/index'
import { dbRef } from '#database/reference'
import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { serializeAccessToken } from '@localspace/node-lib'

export const input = vine.compile(
  vine.object({
    email: CustomerEMailS(),
    password: CustomerPasswordS(),
  })
)

export default class Controller {
  async handle(ctx: HttpContext) {
    if (!setting.customer.signIn.active) {
      throw new ForbiddenException('Customer sign-in is disabled')
    }

    const payload = await ctx.request.validateUsing(input)

    const credential = await Credential.findBy({
      [dbRef.credential.identifierC]: payload.email,
      [dbRef.credential.typeC]: 'email' as CredentialTypeT,
    })

    if (!credential) {
      await hash.make(payload.password)

      throw new BadRequestException('Invalid credentials', {
        source: 'email',
        reason: 'Email not found',
      })
    }

    const credentialPassword = credential.password

    if (!credentialPassword) {
      throw new Error('Credential password is missing')
    }

    if (!(await hash.verify(credentialPassword, payload.password))) {
      throw new BadRequestException('Invalid credentials', {
        source: 'email',
        reason: 'Password is incorrect',
      })
    }

    await credential.load('user')

    const user = credential.user

    const existingTokens = await User.accessTokens.all(user)

    if (existingTokens.length > 0) {
      for await (const token of existingTokens) {
        await User.accessTokens.delete(user, token.identifier)
      }
    }

    const token = await User.accessTokens.create(user)

    return {
      token: serializeAccessToken(token),
      message: `You have successfully signed in!`,
    }
  }
}
