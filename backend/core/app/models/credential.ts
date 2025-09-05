import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import { dbRef } from '#database/reference'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { type CredentialTypeT } from '#validators/index'
import hash from '@adonisjs/core/services/hash'

export default class Credential extends BaseModel {
  static table = dbRef.credential.table.name

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: string

  @column()
  declare type: CredentialTypeT

  @column()
  declare identifier: string

  @column({ serializeAs: null })
  declare password: string | null

  @beforeSave()
  static async hashPassword(row: Credential) {
    if (row.$dirty.password) {
      row.password = row.password ? await hash.make(row.password) : null
    }
  }

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
