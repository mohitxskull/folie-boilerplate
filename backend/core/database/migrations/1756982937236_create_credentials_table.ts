import { ULID_LENGTH } from '#config/ulid'
import { dbRef } from '#database/reference'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = dbRef.credential.table.name

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments(dbRef.credential.id)
      t.string(dbRef.credential.userId, ULID_LENGTH)
        .notNullable()
        .references(dbRef.user.table.columns('id'))
        .onDelete('CASCADE')
      t.string(dbRef.credential.type).notNullable()
      t.string(dbRef.credential.identifier).notNullable()
      t.string(dbRef.credential.password).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
