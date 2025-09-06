import { Logger } from '@adonisjs/core/logger'
import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import {
  transform,
  transformArray,
  transformPage,
} from '@localspace/node-lib/transformer'

/**
 * The container bindings middleware binds classes to their request
 * specific value using the container resolver.
 *
 * - We bind "HttpContext" class to the "ctx" object
 * - And bind "Logger" class to the "ctx.logger" object
 */
export default class ContainerBindingsMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    ctx.containerResolver.bindValue(HttpContext, ctx)
    ctx.containerResolver.bindValue(Logger, ctx.logger)

    ctx.transform = transform
    ctx.transformArray = transformArray
    ctx.transformPage = transformPage

    return await next()
  }
}

declare module '@adonisjs/core/http' {
  export interface HttpContext {
    transform: typeof transform
    transformArray: typeof transformArray
    transformPage: typeof transformPage
    deviceId: string
    isNewDevice: boolean
  }
}
