'use strict'

class Section {
  get validateAll () {
    return true
  }

  get rules () {
    const catId = this.ctx.params.id

    return {
      name: `required|unique:sections,name,id,${catId}`
    }
  }

  get messages () {
    //  return Antl.forLocale('pt').list('validation')
    return {
      'name.required': 'Informe o nome da Sessão!',
      'name.unique': 'Já existe uma sessão cadastrada com esse nome!'
    }
  }
}

module.exports = Section
