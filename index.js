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
    let status

    if (origin) status = origin.status || origin.statusCode

    if (!status) {
      status = 'ENOENT' === code ? 404 : code
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
