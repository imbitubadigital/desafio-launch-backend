'use strict'

const Product = use('App/Models/Product')
const File = use('App/Models/File')
class ProductController {
  async index () {
    const products = await Product.query()
      .with('categories')
      .with('sections')
      .with('file')
      .paginate()
    return products
  }

  async store ({ request }) {
    const { sections, ...data } = request.only([
      'title',
      'subtitle',
      'description',
      'public_date',
      'category_id',
      'status',
      'price',
      'file_id',
      'stock',
      'sections'
    ])

    const file = await File.create({ file: 'fake', name: 'fake' })
    const fileJSON = file.toJSON()

    data.file_id = fileJSON.id

    const product = await Product.create(data)
    await product.sections().attach(sections)
    await product.load('sections')
    await product.load('file')
    return product
  }

  async show ({ params }) {
    const product = await Product.query()
      .where('id', params.id)
      .with('categories', builder => builder.select('id', 'name'))
      .with('sections', builder => builder.select('id', 'name'))
      .with('file')
      .first()
    return product
  }

  async update ({ params, request }) {
    const { sections, ...data } = request.only([
      'title',
      'subtitle',
      'description',
      'public_date',
      'category_id',
      'status',
      'price',
      'file_id',
      'stock',
      'sections'
    ])
    const product = await Product.findOrFail(params.id)
    await product.merge(data)
    await product.save()
    await product.sections().sync(sections)
    await product.load('categories')
    await product.load('sections')
    await product.load('file')
    return product
  }

  async destroy ({ params }) {
    const product = await Product.findOrFail(params.id)
    const file = await File.findOrFail(product.file_id)
    if (file) {
      await file.delete()
    }
    await product.delete()
  }
}

module.exports = ProductController
