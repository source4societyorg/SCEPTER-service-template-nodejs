test('Hello service is invoked with azure configuration when passed as environment variable', (done) => {
  process.env.PROVIDER = 'azure'
  const handler = require('../handler.js')
  const mockContext = {
    done: () => done()
  }
  handler.hello(mockContext, undefined)
})
