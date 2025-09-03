import { table } from '#database/reference'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = table.user.name

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments(table.user.columns.id).notNullable()
      t.string(table.user.columns.name).nullable()
      t.string(table.user.columns.email, 254).notNullable().unique()

      t.timestamp('created_at').notNullable()
      t.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
