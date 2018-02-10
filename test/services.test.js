const HelloService = require('../service')
const credentialsTest = require('./credentials-test.json')
const parametersTest = require('./parameters-test.json')
const servicesTest = require('./services-test.json')
test('service constructor defines properties', () => {
  let service = new HelloService()
  service = new HelloService('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  expect(service.environment).toEqual('test1')
  expect(service.credentials).toEqual(credentialsTest)
  expect(service.parameters).toEqual(parametersTest)
  expect(service.services).toEqual(servicesTest)
})

test('hello function executes callback with proper data passed into success parameter', (done) => {
  const mockCallback = (err, data) => {
    expect(err).toBeNull()
    expect(data).toEqual('hello world')
    done()
  }

  let service = new HelloService()
  service = new HelloService('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  service.hello(mockCallback)
})

test('prepareErrorResponse returns the error output of the service', () => {
  let service = new HelloService('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  const mockError = { message: 'error', code: 500 }
  const mockError2 = 'error'
  const expectedResponse = { body: '"error"', headers: { 'Content-Type': 'application/json' }, 'status': 500, 'statusCode': 500 }
  const expectedResponse2 = { body: '"Unexpected Error"', headers: { 'Content-Type': 'application/json' }, status: 500, statusCode: 500 }
  expect(service.prepareErrorResponse(mockError)).toEqual(expectedResponse)
  expect(service.prepareErrorResponse(mockError2)).toEqual(expectedResponse)
  expect(service.prepareErrorResponse()).toEqual(expectedResponse2)
})

test('prepareSuccessResponse returns "hello"', () => {
  let service = new HelloService('test1', './test/credentials-test.json', './test/parameters-test.json', './test/services-test.json')
  const expectedResponse = { body: '"Hello"', headers: { 'Content-Type': 'application/json' }, status: 200, statusCode: 200 }
  expect(service.prepareSuccessResponse('Hello')).toEqual(expectedResponse)
})
