'use strict'
const Category = use('App/Models/Category')

class CategoryFormController {
  async index () {
    // const categories = await Category.all()
    const categories = await Category.query()
      .select('id', 'name')
      .fetch()

    return categories
  }
}

module.exports = CategoryFormController
