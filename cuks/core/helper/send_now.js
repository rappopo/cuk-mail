'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib

  return (msg, transp) => {
    const transporter = _.isString(transp) ? helper('mail:getTransporter') : helper('mail:setTransporter')(transp)
    const message = helper('mail:composeMessage')(msg)
    return transporter.sendMail(message)
  }
}
