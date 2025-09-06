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
import { userLimiter } from './limiter.js'

router
  .group(() => {
    router
      .group(() => {
        router
          .group(() => {
            customerRoutes()

            router.get('ping', [() => import('#controllers/ping_controller')])
          })
          .prefix('v1')
      })
      .prefix('api')
  })
  .use([userLimiter])
