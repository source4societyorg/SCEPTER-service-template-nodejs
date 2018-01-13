const HelloService = require('../service')
const credentialsTest = require('./credentials-test.json')
const parametersTest = require('./parameters-test.json')
const servicesTest = require('./services-test.json')
test('service constructor defines properties', () => {
  let service = new HelloService()
  expect(service.environment).toEqual('dev')
  service = new HelloService('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  expect(service.environment).toEqual('test1')
  expect(service.credentials).toEqual(credentialsTest)
  expect(service.parameters).toEqual(parametersTest)
  expect(service.services).toEqual(servicesTest)
})

test('prepareErrorResponse returns the error output of the service', () => {
  let service = new HelloService('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  const mockError = { message: 'error', code: 500 }
  expect(service.prepareErrorResponse(mockError)).toEqual(mockError)
})

test('prepareSuccessResponse returns "hello"', () => {
  let service = new HelloService('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  expect(service.prepareSuccessResponse()).toEqual('Hello')
})
