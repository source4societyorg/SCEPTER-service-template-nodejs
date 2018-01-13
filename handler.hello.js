'use strict'

const utilities = require('@source4society/scepter-utility-lib')
const handlerUtilities = require('./handlerUtilities')

const hello = (
  event,
  context,
  callback,
  constructService = handlerUtilities.constructHelloService,
  env = handlerUtilities.ENVIRONMENT,
  servicesPath = handlerUtilities.SERVICE_PATH,
  credentialsPath = handlerUtilities.CREDENTIALS_PATH,
  callbackHandler = utilities.standardCallbackHandler,
  getErrorHandlerDependency = utilities.standardErrorHandler,
  getSuccessHandlerDependency = utilities.standardSuccessHandler
) => {
  // inject dependencies
  const service = constructService(env, credentialsPath, servicesPath)
  const errorHandler = getErrorHandlerDependency(callback, service)
  const successHandler = getSuccessHandlerDependency(callback, service)

  // Invoke service
  try {
    service.hello((err, data) => callbackHandler(err, data, errorHandler, successHandler))
  } catch (error) {
    errorHandler(error)
  }
}

module.exports = hello
