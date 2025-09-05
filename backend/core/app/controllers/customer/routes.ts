import router from '@adonisjs/core/services/router'
import { customerAuthRoutes } from './auth/routes.js'

export const customerRoutes = () => {
  router
    .group(() => {
      customerAuthRoutes()
    })
    .prefix('customer')
}
