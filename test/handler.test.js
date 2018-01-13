test('hello handler handles error properly', (done) => {
  const handler = require('../handler.js')
  const mockService = {
    hello: () => { throw new Error('test error') }
  }

  handler.hello(undefined, undefined, (result) => done(), () => mockService)
})

test('handler injects optional dependencies', (done) => {
  const handler = require('../handler.js')
  handler.hello(
    undefined,
    undefined,
    () => done(),
    () => ({ hello: done() }),
    'test',
    './test/services-test.json',
    './test/credentials-test.json',
    () => done(),
    (callbackFunc, service) => () => 'newfunc',
    (callbackFunc, service) => () => 'newfunc'
  )
})
