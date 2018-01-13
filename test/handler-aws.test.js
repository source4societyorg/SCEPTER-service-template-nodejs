test('Hello service is invoked with aws configuration by default', (done) => {
  const handler = require('../handler.js')
  handler.hello(undefined, undefined, (result) => {
    done()
  })
})
