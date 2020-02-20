'use strict'

const Antl = use('Antl')

class Service {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|unique:services'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Service
