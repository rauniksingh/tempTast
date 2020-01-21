require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const enviroment = process.env.NODE_ENV || 'Development'
const morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize')
const cors = require('cors')
const chalk = require('chalk')
const cluster = require('cluster')
const winston = require('./lib/logger/winston')
const reqlogger = require('./lib/logger/bunyan')
const helmet = require('helmet')

// Enviroment Setup
let envConfig

switch (enviroment) {
  case 'Development':
    envConfig = require('./config/local.json');
    break;

  case 'Staging':
    envConfig = require('./config/staging.json');
    break;

  case 'Production':
    envConfig = require('./config/prod.json');
    break;

  default:
    envConfig = require('./config/local.json');
    break;
};

module.exports = envConfig

// Config Server Port
if (!cluster.isMaster) {
  app.listen(envConfig.server.port, () => {
    console.log(chalk.blue(' [ ✓ ] Running on port : ' + envConfig.server.port))
  })
};

// MiddleWares
app.use(bodyParser.urlencoded({ extended: true, limit: '25mb' }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(morgan('combined', { stream: winston.stream }));
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(require('express-request-id')())

app.use((req, res, next) => {
  const log = reqlogger.loggerInstance.child({ id: req.id, body: req.body, token: req.headers.authorization }, true)
  log.info({ req: req })
  next();
})

// Dependencies
require('./Cluster')
require('./DataAdaptor/Mongo/Connection')

// Routers Config
app.use(require('./routes/IndexRouter'))
