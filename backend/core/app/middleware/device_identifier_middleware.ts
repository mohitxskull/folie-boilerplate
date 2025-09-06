import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { ForbiddenException } from '@localspace/package-backend-lib/exception'
import vine from '@vinejs/vine'

const schema = vine.compile(
  vine.object({
    headers: vine
      .object({
        visitorId: vine.string().maxLength(2048).minLength(10).optional(),
      })
      .optional(),

    cookies: vine
      .object({
        deviceId: vine.string().maxLength(2048).minLength(10).optional(),
      })
      .optional(),
  })
)

export default class DeviceIdentifierMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const payload = await ctx.request.validateUsing(schema)

    const visitorId = payload.headers?.visitorId
    const deviceId = payload.cookies?.deviceId

    if (!visitorId) {
      throw new ForbiddenException()
    }

    ctx.visitorId = visitorId

    if (deviceId) {
      ctx.deviceId = deviceId
      ctx.isNewDevice = false
    } else {
      ctx.deviceId = ctx.visitorId
      ctx.isNewDevice = true

      ctx.response.encryptedCookie('deviceId', ctx.deviceId, {
        domain: new URL(env.get('APP_URL')).hostname,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
    }

    return await next()
  }
}
