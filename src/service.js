'use strict'

const GenericHandler = require('@source4society/scepter-handlerutilities-lib')
class HelloService extends GenericHandler {
  serviceCall () {
    this.successResponse('hello world')
  }
}

module.exports = HelloService
