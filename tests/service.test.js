const HelloService = require('../src/service')

test('HelloService serviceCall overrides parent and returns a hello world response object', (done) => {
  const mockCallback = (emptyError, result) => {
    expect(result.status).toEqual(true)
    expect(result.result).toEqual('hello world')
    expect(emptyError).toBeNull()
    done()
  }
  const Hello = new HelloService('mockEvent', 'mockContext', mockCallback)
  Hello.serviceCall()
})
