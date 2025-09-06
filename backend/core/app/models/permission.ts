import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { dbRef } from '#database/reference'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { JSONColumn } from '@localspace/node-lib/column/json'

export default class Permission extends BaseModel {
  static table = dbRef.permission.table.name

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare resourceId: string

  @column(JSONColumn())
  declare actions: string[]

  @column()
  declare userId: string

  // Relations =========================

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
