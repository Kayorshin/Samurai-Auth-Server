'use strict'

const Model = use('Model')

class Service extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'name'
      },
      strategy: 'dbIncrement',
      disableUpdates: false
    })
  }

  users () {
    return this.belongsToMany('App/Models/User')
      .pivotModel('App/Models/UserService')
  }
}

module.exports = Service
