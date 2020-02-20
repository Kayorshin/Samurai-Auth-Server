'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table
        .string('name')
        .notNullable()
        .unique()
      table
        .string('slug')
        .notNullable()
        .unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
