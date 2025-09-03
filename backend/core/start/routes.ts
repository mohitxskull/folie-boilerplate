/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { NotFoundException } from '@folie/package-backend-lib/exception'

router
  .group(() => {
    router
      .group(() => {
        router.get('ping', [() => import('#controllers/ping_controller')])
      })
      .prefix('V1')
  })
  .prefix('api')

router.any('*', (ctx) => {
  throw new NotFoundException('Route not found', {
    metadata: {
      route: ctx.request.url(),
      method: ctx.request.method(),
    },
  })
})
