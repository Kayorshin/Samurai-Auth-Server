'use strict'

const Service = use('App/Models/Service')
const Database = use('Database')

class ServiceController {
  async index ({ auth }) {
    const services = await Database
      .table('user_services')
      .where('user_id', auth.user.id)
      .innerJoin('services', 'user_services.service_id', 'services.id')
      .select('name', 'slug')

    return services
  }

  async store ({ request }) {
    const data = request.only(['name'])

    const service = await Service.create(data)

    return service
  }

  async show ({ response, params, auth }) {
    const service = await Database
      .table('user_services')
      .where('user_id', auth.user.id)
      .where('service_id', params.id)
      .innerJoin('services', 'user_services.service_id', 'services.id')
      .select('name', 'slug')

    if (service.length === 0) {
      return response.status(401).send({
        message: 'Você não possui autorização para acessar este serviço'
      })
    }

    return service
  }
}

module.exports = ServiceController
