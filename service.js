'use strict'
const optionalRequire = require('optional-require')(require)
const utilities = require('@source4society/scepter-utility-lib')
class HelloService {
  constructor (injectedStage, injectedCredentialsPath, injectedParametersPath, injectedServicesPath) {
    const stage = utilities.valueOrDefault(injectedStage, process.env.STAGE)
    const credentialsPath = utilities.valueOrDefault(injectedCredentialsPath, './credentials')
    const parametersPath = utilities.valueOrDefault(injectedParametersPath, './credentials')
    const servicesPath = utilities.valueOrDefault(injectedServicesPath, './credentials')
    this.environment = stage
    this.credentials = optionalRequire(credentialsPath)
    this.services = optionalRequire(servicesPath)
    this.parameters = optionalRequire(parametersPath)
    this.utilities = require('@source4society/scepter-utility-lib')
  }

  hello (helloCallback) {
    helloCallback(null, 'hello world')
  }

  prepareErrorResponse (error) {
    let res = {}
    res.headers = {
      'Content-Type': 'application/json'
    }
    res.status = !this.utilities.isEmpty(error) ? error.code || 500 : 500
    res.statusCode = !this.utilities.isEmpty(error) ? error.code || 500 : 500
    res.body = JSON.stringify(!this.utilities.isEmpty(error) ? error.message || error : 'Unexpected Error')
    return res
  }

  prepareSuccessResponse (data) {
    let res = {}
    res.headers = {
      'Content-Type': 'application/json'
    }
    res.status = 200
    res.statusCode = 200
    res.body = JSON.stringify(data)
    return res
  }
}

module.exports = HelloService
