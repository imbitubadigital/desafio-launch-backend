'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SectionSchema extends Schema {
  up () {
    this.create('sections', table => {
      table.increments()
      table
        .string('name', 50)
        .notNullable()
        .unique()
      table.string('slug', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('sections')
  }
}

module.exports = SectionSchema
