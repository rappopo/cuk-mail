'use strict'

module.exports = function (cuk) {
  const { helper } = cuk.pkg.core.lib

  return (opts) => {
    const msg = helper('core:merge')(opts, {})
    return msg
  }
}
