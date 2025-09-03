import { NotFoundException } from '@folie/package-backend-lib/exception'
import vine from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'

export const input = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(20).trim().escape().optional(),
  })
)

export default class Controller {
  async handle(ctx: HttpContext) {
    const payload = await ctx.request.validateUsing(input)

    if (payload.name === 'skull') {
      throw new NotFoundException()
    }

    return { message: 'pong', ip: ctx.request.ip(), name: payload?.name ?? 'Anonymous' }
  }
}
