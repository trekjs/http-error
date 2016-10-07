'use strict'

const { STATUS_CODES } = require('http')

/**
 * HttpError
 *
 * @class HttpError
 * @param {Number|String} code
 * @param {String} message
 * @param {Object} origin
 * @param {Boolean} expose
 * @api public
 */

class HttpError {
  constructor (code = 500, message = '', origin = null, expose = false) {
    let status = code
    if ('ENOENT' === code) {
      status = 404
      message = STATUS_CODES[404]
    }

    this.code = code
    this.status = status
    this.message = message || STATUS_CODES[status] || 'unknown'
    this.origin = origin
    this.expose = expose

    Error.captureStackTrace(this)
  }

  get name () {
    return 'HttpError'
  }
}

Reflect.setPrototypeOf(HttpError.prototype, Error.prototype)

module.exports = HttpError
