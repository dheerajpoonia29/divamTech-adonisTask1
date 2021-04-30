'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class tableSchema extends Schema {
  up () {
    this.create('leaves', (table) => {
      table.increments()
      table.integer('employee_id').notNullable()
      table.string('username', 100).notNullable()

      table.string('subject', 200).notNullable()
      table.text('description').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('manager_id').notNullable()
      table.string('status', 50).defaultTo('apply')
      table.boolean('isDeleted').notNullable().defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('tables')
  }
}

module.exports = tableSchema
