'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Model = use('Model')

class Product extends Model {
  static boot () {
    super.boot()
    this.addTrait('@provider:Lucid/Slugify', {
      fields: { slug: 'title' },
      strategy: 'dbIncrement'
    })
  }

  categories () {
    return this.hasOne('App/Models/Category', 'category_id', 'id')
  }

  file () {
    return this.hasOne('App/Models/File', 'file_id', 'id')
  }

  sections () {
    return this.belongsToMany('App/Models/Section').pivotModel(
      'App/Models/ProductSection'
    )
  }
}

module.exports = Product
