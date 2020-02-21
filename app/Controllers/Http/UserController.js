'use strict'

const User = use('App/Models/User')
const Service = use('App/Models/Service')
const Database = use('Database')

class UserController {
  async index ({ auth }) {
    const user = await User
      .query()
      .select('name', 'email')
      .where('id', auth.user.id)
      .first()

    const services = await Database
      .table('user_services')
      .select('name', 'slug', 'services.id')
      .where('user_id', auth.user.id)
      .innerJoin('services', 'user_services.service_id', 'services.id')

    return { user, services }
  }

  async store ({ request }) {
    const data = request.only(['name', 'email', 'password'])
    const services = request.input('services')

    const user = await User.create(data)

    const processedServices = services.map((service) => ({
      name: service
    }))

    const pmsFindOrCreate = processedServices.map(
      (processedService) => Service.findOrCreate(processedService)
    )

    const rstFindOrCreate = await Promise.all(pmsFindOrCreate)

    const pmsServicesAttach = rstFindOrCreate.map(
      (result) => user.services().attach(result.id)
    )

    await Promise.all(pmsServicesAttach)

    return user
  }
}

module.exports = UserController
