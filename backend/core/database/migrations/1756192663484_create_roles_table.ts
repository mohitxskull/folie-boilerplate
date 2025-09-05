import { dbRef } from '#database/reference'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = dbRef.role.table.name

  async up() {
    this.schema.createTable(this.tableName, (t) => {
      t.increments(dbRef.role.id)
      t.string(dbRef.role.name).unique().notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
