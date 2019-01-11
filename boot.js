'use strict'

module.exports = function (cuk) {
  return new Promise((resolve, reject) => {
    require('./lib/make_transporter')(cuk)
      .then(() => {
        resolve(true)
      })
      .catch(reject)
  })
}
