'use strict'
const Env = use('Env')

const Model = use('Model')

class File extends Model {
  static boot () {
    super.boot()
    this.addHook('beforeDelete', 'FileHook.deleteFile')
    this.addHook('beforeUpdate', 'FileUpdateHook.updateFile')
  }
  static get computed () {
    return ['url']
  }

  getUrl ({ id, type }) {
    if (!type) return null

    return `${Env.get('APP_URL')}/file/${id}`
  }
}

module.exports = File
