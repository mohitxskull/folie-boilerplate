import { ULID_LENGTH } from '#config/ulid'
import { dbRef } from '#database/reference'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = dbRef.permission.table.name

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments(dbRef.permission.id)
      t.string(dbRef.permission.resourceId).notNullable()
      t.json(dbRef.permission.actions).notNullable()
      t.string(dbRef.permission.userId, ULID_LENGTH)
        .notNullable()
        .references(dbRef.user.table.columns('id'))
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
