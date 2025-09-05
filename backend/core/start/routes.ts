/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { customerRoutes } from '#controllers/customer/routes'
import router from '@adonisjs/core/services/router'
import { NotFoundException } from '@localspace/package-backend-lib/exception'

router
  .group(() => {
    router
      .group(() => {
        customerRoutes()

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
