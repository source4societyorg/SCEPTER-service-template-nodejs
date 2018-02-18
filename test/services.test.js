const credentialsTest = require('./credentials-test.json')
const parametersTest = require('./parameters-test.json')
const servicesTest = require('./services-test.json')
const fromJS = require('immutable').fromJS
test('service constructor defines properties', () => {
  const Service = require('../service')
  let service = new Service('test', './test/credentials-test.json', './test/services-test.json', './test/parameters-test.json')
  expect(service.environment).toEqual('test')
  expect(service.credentials).toEqual(fromJS(credentialsTest))
  expect(service.parameters).toEqual(fromJS(parametersTest))
  expect(service.services).toEqual(fromJS(servicesTest))
})

test('hello function executes callback with proper data passed into success parameter', (done) => {
  const mockCallback = (err, data) => {
    expect(err).toBeNull()
    expect(data).toEqual('hello world')
    done()
  }

  const Service = require('../service')
  const service = new Service('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  service.hello(mockCallback)
})

test('prepareErrorResponse returns the error output of the service', () => {
  const Service = require('../service')
  let service = new Service('test', './test/credentials-test.json', './test/services-test.json', './test/parameters-test.json')
  const mockError = new Error('test error')
  const expectedResponse = {'error': mockError.message, 'status': false}
  expect(service.prepareErrorResponse(mockError)).toEqual(expectedResponse)
})

test('prepareSuccessResponse returns data', () => {
  const Service = require('../service')
  let service = new Service('test', './test/credentials-test.json', './test/services-test.json', './test/parameters-test.json')
  const expectedResponse = {'result': 'Hello', 'status': true}
  expect(service.prepareSuccessResponse('Hello')).toEqual(expectedResponse)
})
