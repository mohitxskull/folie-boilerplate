import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { dbRef } from '#database/reference'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Role from './role.js'

export default class Membership extends BaseModel {
  static table = dbRef.membership.table.name

  // Columns =============================

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: string

  @column()
  declare roleId: number

  // Relations =========================

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Role)
  declare role: BelongsTo<typeof Role>
}
