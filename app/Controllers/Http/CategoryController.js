'use strict'
const Category = use('App/Models/Category')
const Product = use('App/Models/Product')

class CategoryController {
  async index () {
    const categories = await Category.all()
    return categories
  }

  async store ({ request }) {
    const data = request.only(['name'])
    const category = await Category.create(data)
    return category
  }

  async show ({ params }) {
    const category = await Category.findOrFail(params.id)
    return category
  }

  async update ({ params, request }) {
    const data = request.only(['name'])
    const category = await Category.findOrFail(params.id)
    await category.merge(data)
    await category.save()
    return category
  }

  async destroy ({ response, params }) {
    const product = await Product.query()
      .where('category_id', params.id)
      .first()

    if (product) {
      return response.status(400).send({
        error: {
          message:
            'Atenção! Essa categoria não pode ser deleteda pois a mesma já possui produtos anexados a ela.'
        }
      })
    }

    const category = await Category.findOrFail(params.id)
    await category.delete()
  }
}

module.exports = CategoryController
