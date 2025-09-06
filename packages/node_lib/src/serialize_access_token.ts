import { AccessToken } from '@adonisjs/auth/access_tokens'
import { DateTime } from 'luxon'

export const serializeAccessToken = (accessToken: AccessToken) => {
  return {
    type: 'bearer',
    value: accessToken.value!.release(),
    expiresAt: accessToken.expiresAt ? DateTime.fromJSDate(accessToken.expiresAt).toISO() : null,
  }
}
