const HelloService = require('./service')

const handlerUtilities = {
  constructHelloService: (environment, credentialsPath, servicesPath) => (
    new HelloService(environment, credentialsPath, servicesPath)
  ),
  ENVIRONMENT: process.env.stage || 'dev',
  SERVICE_PATH: process.env.SERVICES_PATH || './services',
  CREDENTIALS_PATH: process.env.CREDENTIALS_PATH || './credentials'
}

module.exports = handlerUtilities
