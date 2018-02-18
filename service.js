'use strict'
const utilities = require('@source4society/scepter-utility-lib')
// const DynamoDBLib = require('@source4society/scepter-dynamodb-lib')
const fromJS = require('immutable').fromJS
class HelloService {
  constructor (injectedStage, injectedCredentialsPath, injectedServicesPath, injectedParametersPath, injectedDynamoDB) {
    const stage = utilities.valueOrDefault(injectedStage, process.env.STAGE)
    const credentialsPath = utilities.valueOrDefault(injectedCredentialsPath, './credentials')
    const servicesPath = utilities.valueOrDefault(injectedServicesPath, './services')
    const parametersPath = utilities.valueOrDefault(injectedParametersPath, './parameters')
    // const DynamoDB = utilities.valueOrDefault(injectedDynamoDB, DynamoDBLib)
    this.environment = stage
    this.credentials = fromJS(require(credentialsPath))
    this.services = fromJS(require(servicesPath))
    this.parameters = fromJS(require(parametersPath))
    // this.dynamoDB = new DynamoDB()
    // this.dynamoDB.setConfiguration(this.credentials, this.environment)
  }

  hello (helloCallback) {
    helloCallback(null, 'hello world')
  }

  prepareErrorResponse (error, injectedEnvironment) {
    const environment = utilities.valueOrDefault(injectedEnvironment, this.environment)
    const message = utilities.ifTrueElseDefault(environment === 'development', error.stack, error.message)
    return {
      status: false,
      error: utilities.valueOrDefault(message, error)
    }
  }

  prepareSuccessResponse (data) {
    return {
      status: true,
      result: data
    }
  }
}

module.exports = HelloService
