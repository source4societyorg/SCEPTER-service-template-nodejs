test('hello handler handles error properly', (done) => {
  const helloHandler = require('../handler.hello')
  const mockService = {
    hello: () => { throw new Error('test error') },
    prepareErrorResponse: () => done()
  }

  helloHandler((result) => ({ done: done() }), undefined, (result) => done(), () => mockService)
})

test('handler injects optional dependencies', (done) => {
  const helloHandler = require('../handler.hello')
  helloHandler(
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
