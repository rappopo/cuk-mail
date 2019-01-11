'use strict'

module.exports = function (cuk) {
  const { _, helper, path } = cuk.pkg.core.lib

  return new Promise((resolve, reject) => {
    helper('core:trace')('|  |- Creating transporter...')
    helper('core:bootFlat')({
      pkgId: 'mail',
      name: 'transporter',
      ext: helper('core:configFileExt')(),
      action: opt => {
        const ext = path.extname(opt.file)
        helper('core:configLoad')(opt.dir, path.basename(opt.file, ext))
          .then(result => {
            result = result || {}
            result.opts = result.opts || {}
            if (result.type !== 'smtp') return
            const conn = helper('mail:setTransporter')(result.opts)
            _.set(opt.pkg, 'cuks.mail.transporter.' + opt.key, conn)
            helper('core:trace')('|  |  |- %s:%s ', opt.pkg.id, opt.key)
          })
      }
    })
    resolve(true)
  })
}
