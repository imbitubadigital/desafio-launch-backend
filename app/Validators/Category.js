'use strict'

class Category {
  get validateAll () {
    return true
  }

  get rules () {
    const catId = this.ctx.params.id

    return {
      name: `required|unique:categories,name,id,${catId}`
    }
  }

  get messages () {
    //  return Antl.forLocale('pt').list('validation')
    return {
      'name.required': 'Informe o nome da Categoria!',
      'name.unique': 'Já existe uma categoria cadastrada com esse nome!'
    }
  }
}

module.exports = Category
