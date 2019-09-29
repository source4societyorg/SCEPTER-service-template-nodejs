const hello = require('../src/handler')
const HelloService = require('../src/service')

test('hello handler executes serviceCall and catches errors', (done) => {
  const mockCallback = (error, result) => {
    expect(error.status).toEqual(false)
    expect(error.error).toEqual('mockError')
    expect(result).toBeUndefined()
    done()
  }
  const mockError = new Error('mockError')
  HelloService.prototype.serviceCall = () => { throw mockError }
  hello('mockEvent', 'mockContext', mockCallback)
})
