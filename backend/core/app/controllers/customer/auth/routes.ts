import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

export const customerAuthRoutes = () => {
  router
    .group(() => {
      router
        .post('sign-in', [() => import('#controllers/customer/auth/sign_in_controller')])
        .use([middleware.captcha()])
    })
    .prefix('auth')
}
