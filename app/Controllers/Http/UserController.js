'use strict'

const User = use('App/Models/User')
const Service = use('App/Models/Service')

class UserController {
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
