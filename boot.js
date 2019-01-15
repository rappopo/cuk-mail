'use strict'

module.exports = function (cuk) {
  return new Promise((resolve, reject) => {
    require('./lib/init_transporter')(cuk)
      .then(() => {
        resolve(true)
      })
      .catch(reject)
  })
}
