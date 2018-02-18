'use strict'
const utilities = require('@source4society/scepter-utility-lib')
const genericHandlerFunction = require('@source4society/scepter-handlerutilities-lib').genericHandlerFunction

module.exports.hello = (event, context, callback, injectedGenericHandler) => {
  const genericHandler = utilities.valueOrDefault(injectedGenericHandler, genericHandlerFunction)
  genericHandler(event, context, callback, (service, callbackHandler, errorHandler, successHandler, eventData) => {
    service.hello((err, data) => callbackHandler(err, data, errorHandler, successHandler))
  })
}
