'use strict'

module.exports = function (cuk) {
  const { nodemailer } = cuk.pkg.mail.lib

  return (cfg) => {
    const conn = nodemailer.createTransport(cfg)
    return conn
  }
}
