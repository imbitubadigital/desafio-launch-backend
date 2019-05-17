'use strict'

const File = use('App/Models/File')
const Helpers = use('Helpers')
class FileController {
  async index ({ request, response, view }) {}

  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })
      const filename = `${Date.now()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: filename })
      if (!upload.moved()) {
        throw upload.error()
      }

      const file = await File.create({
        file: filename,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subscribe
      })
      return file
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Erro ao realizar upload' } })
    }
  }

  async show ({ params, request, response, view }) {
    const file = await File.findOrFail(params.id)
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }

  async update ({ params, request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', {
        size: '2mb'
      })
      const fileNewName = `${Date.now()}${Math.random()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: fileNewName })

      if (!upload.moved()) {
        throw upload.error()
      }

      const data = {
        file: fileNewName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      }

      const file = await File.findOrFail(params.id)
      file.merge(data)
      file.save()

      return file
    } catch (err) {
      return response
        .status(400)
        .send({ error: { message: 'Falha ao realizar upload do arquivo ' } })
    }
  }

  async destroy ({ params }) {
    const file = await File.find(params.id)
    if (file) {
      await file.delete()
    }
  }
}

module.exports = FileController
