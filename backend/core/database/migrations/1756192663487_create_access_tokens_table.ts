import { ULID_LENGTH } from '#config/ulid'
import { dbRef } from '#database/reference'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auth_access_tokens'

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments('id')
      t.string('tokenable_id', ULID_LENGTH)
        .notNullable()
        .references(dbRef.user.table.columns('id'))
        .onDelete('CASCADE')

      t.string('type').notNullable()
      t.string('name').nullable()
      t.string('hash').notNullable()
      t.text('abilities').notNullable()
      t.timestamp('created_at')
      t.timestamp('updated_at')
      t.timestamp('last_used_at').nullable()
      t.timestamp('expires_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
