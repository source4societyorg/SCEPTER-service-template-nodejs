'use strict'
const HelloService = require('./service')

function hello (event, context, callback) {
  const Hello = new HelloService(event, context, callback)
  try {
    Hello.serviceCall()
  } catch (e) {
    Hello.errorResponse(e)
  }
}

module.exports = hello
