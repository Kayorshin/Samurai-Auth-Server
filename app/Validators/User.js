'use strict'

const Antl = use('Antl')

class User {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      services: 'required|array',
      'services.*': 'required'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = User
