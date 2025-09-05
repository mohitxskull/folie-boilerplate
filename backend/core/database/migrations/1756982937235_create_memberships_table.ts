import { ULID_LENGTH } from '#config/ulid'
import { dbRef } from '#database/reference'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = dbRef.membership.table.name

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments(dbRef.membership.id)

      t.string(dbRef.membership.userId, ULID_LENGTH)
        .notNullable()
        .references(dbRef.user.table.columns('id'))
        .onDelete('CASCADE')

      t.integer(dbRef.membership.roleId)
        .unsigned()
        .notNullable()
        .references(dbRef.role.table.columns('id'))
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
