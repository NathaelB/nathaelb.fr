import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'permissions'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('permission_group_id').unsigned().references('id').inTable('permission_groups').onDelete('SET NULL')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('permission_group_id')
    })
  }
}
