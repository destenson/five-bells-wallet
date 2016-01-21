"use strict"

const co = require('co')
const Koa = require('koa')
const bodyParser = require('koa-body')
const logger = require('koa-mag')
const session = require('koa-session')
const cors = require('kcors')
const errorHandler = require('five-bells-shared/middlewares/error-handler')
const Validator = require('five-bells-shared').Validator
const Config = require('./config')
const Auth = require('./auth')
const Router = require('./router')
const DB = require('./db')
const Log = require('./log')

module.exports = class App {
  // TODO use decorators
  static constitute () { return [ Config, Auth, Router, Validator, DB, Log ] }
  constructor (config, auth, router, validator, db, log ) {
    this.config = config
    this.auth = auth
    this.router = router
    this.validator = validator
    this.db = db
    this.log = log('app')

    validator.loadSchemasFromDirectory(__dirname + '/../../schemas')

    const app = this.app = new Koa()

    app.use(bodyParser())
    app.use(function *(next) {
      if (this.request.method === 'POST' || this.request.method === 'PUT') {
        // the parsed body will store in this.request.body
        // if nothing was parsed, body will be an empty object {}
        this.body = this.request.body
      }
      yield next
    });

    app.use(logger({mag: log('http')}))
    app.use(errorHandler({log: log('error-handler')}))
    app.use(cors({origin: '*'}))

    app.proxy = true

    // TODO guess what
    app.keys = ['sesssecret']
    app.use(session(app))

    auth.attach(app)

    router.setupDefaultRoutes()
    router.attach(app)
  }

  start () {
    co(this._start.bind(this)).catch((err) => {
      this.log.critical(err)
    })
  }

  * _start () {
    yield this.db.sync()
    this.listen()
  }

  listen () {
    this.app.listen(this.config.server.port)
    this.log.info('ledger-ui listening on ' + this.config.server.bind_ip +
      ':' + this.config.server.port)
    this.log.info('public at ' + this.config.server.base_uri)
  }
}