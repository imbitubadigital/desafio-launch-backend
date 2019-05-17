'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Section extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'name' },
      strategy: 'dbIncrement'
    })
  }
  products () {
    return this.belongsToMany('App/Models/Product').pivotModel(
      'App/Models/ProductSection'
    )
  }
}

module.exports = Section
