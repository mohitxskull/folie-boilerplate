import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const PageS = () => vine.number().min(1).max(100)

export const LimitS = () => vine.number().min(1).max(100)

export const DirectionS = () => vine.enum(['asc', 'desc'])

export const CredentialTypeS = () => vine.enum(['email'])

export type CredentialTypeT = Infer<ReturnType<typeof CredentialTypeS>>
