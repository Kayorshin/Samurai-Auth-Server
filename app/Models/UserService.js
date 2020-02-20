'use strict'

const Model = use('Model')

class UserService extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  services () {
    return this.belongsTo('App/Models/Service')
  }
}

module.exports = UserService
