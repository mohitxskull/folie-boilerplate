import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { dbRef } from '#database/reference'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class CustomerProfile extends BaseModel {
  static table = dbRef.customerProfile.table.name

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: string

  @column()
  declare email: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
