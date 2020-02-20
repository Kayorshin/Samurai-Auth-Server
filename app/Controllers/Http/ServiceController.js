'use strict'

const Service = use('App/Models/Service')
const UserService = use('App/Models/UserService')

class ServiceController {
  async index ({ auth }) {
    const services = await UserService.query()
      .with('user')
      .with('services')
      .where('user_id', auth.user.id)
      .fetch()
    return services
  }

  async store ({ request }) {
    const data = request.only(['name'])

    const service = await Service.create(data)

    return service
  }

  async show ({ response, params, auth }) {
    const service = await UserService.query()
      .with('user')
      .with('services')
      .where('user_id', auth.user.id)
      .where('service_id', params.id)
      .fetch()

    if (service.length === 0) {
      return response.status(401).send({
        message: 'Você não possui autorização para acessar este serviço'
      })
    }

    return service
  }
}

module.exports = ServiceController
