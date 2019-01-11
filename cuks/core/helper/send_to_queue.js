'use strict'

module.exports = function (cuk) {
  const { _, helper } = cuk.pkg.core.lib

  return (site, msg, transp) => {
    const idCol = helper('model:getIdColumn')('mail:queue')
    const id = helper('core:makeId')()
    // TODO: render message with variables
    const body = helper('core:merge')(msg, _.set({ site: site }, idCol, id))
    return helper('model:create')('mail:queue', body)
  }
}
