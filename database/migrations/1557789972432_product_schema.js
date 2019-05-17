'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', table => {
      table.increments()
      table.string('title', 200).notNullable()
      table.string('slug', 200)
      table.string('subtitle', 200).notNullable()
      table.text('description').notNullable()
      table.timestamp('public_date').notNullable()
      table.boolean('status')
      table.decimal('price', 10, 2)
      table.integer('stock')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
