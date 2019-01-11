'use strict'

module.exports = function (cuk) {
  return {
    id: 'mail',
    lib: {
      nodemailer: require('nodemailer')
    }
  }
}
