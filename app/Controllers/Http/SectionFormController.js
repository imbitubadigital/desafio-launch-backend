'use strict'
const Section = use('App/Models/Section')

class SectionFormController {
  async index () {
    const section = await Section.query()
      .select('id', 'name')
      .fetch()
    return section
  }
}

module.exports = SectionFormController
