'use strict'
const ProductSection = use('App/Models/ProductSection')
const Section = use('App/Models/Section')
class SectionController {
  async index () {
    const sections = await Section.query()
      .with('products')
      .fetch()
    return sections
  }

  async store ({ request }) {
    const data = request.only(['name'])
    const section = await Section.create(data)
    await section.load('products')
    return section
  }

  async show ({ params }) {
    const section = await Section.findOrFail(params.id)
    return section
  }

  async update ({ params, request }) {
    const data = request.only(['name'])
    const section = await Section.findOrFail(params.id)
    await section.merge(data)
    await section.save()
    await section.load('products')
    return section
  }

  async destroy ({ response, params }) {
    const product = await ProductSection.query()
      .where('section_id', params.id)
      .first()

    if (product) {
      return response.status(400).send({
        error: {
          message:
            'Atenção! Essa sessão não pode ser deleteda pois a mesma já possui produtos anexados a ela.'
        }
      })
    }
    const section = await Section.findOrFail(params.id)
    await section.delete()
  }
}

module.exports = SectionController
