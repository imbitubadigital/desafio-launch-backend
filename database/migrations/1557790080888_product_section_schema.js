'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSectionSchema extends Schema {
  up () {
    this.create('product_sections', table => {
      table.increments()
      table
        .integer('section_id')
        .unsigned()
        .references('id')
        .inTable('sections')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_sections')
  }
}

module.exports = ProductSectionSchema
