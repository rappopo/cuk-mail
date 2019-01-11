'use strict'

module.exports = function (cuk) {
  const { _, helper, moment } = cuk.pkg.core.lib
  const pkg = cuk.pkg.task

  return {
    time: '*/30 * * * *',
    onTick: function () {
      this.locked = moment()
      const idCol = helper('model:getIdColumn')('mail:queue')
      helper('model:find')('mail:queue', {
        query: {
          status: {
            $nin: ['SENT', 'ERROR']
          }
        },
        sort: 'priority'
      }).then(result => {
        if (result.data.length === 0) return true
        return Promise.map(result.data, d => {
          const transporter = helper('mail:getTransporter')(d.transporter)
          const msg = helper('mail:composeMessage')(d)
          return new Promise((resolve, reject) => {
            helper('model:update')('mail:queue', d[idCol], { status: 'PROCESSING' }).then(result => {
              return transporter.sendMail(msg)
            }).then(result => {
              return helper('model:update')('mail:queue', d[idCol], { status: 'SENT' })
            }).then(result => {
              resolve(true)
            }).catch(err => {
              helper('model:update')('mail:queue', d[idCol], { status: 'ERROR', notes: err.message })
                .then(result => {
                  resolve(false)
                }).catch(() => {
                  resolve(false)
                })
            })
          })
        })
      }).then(result => {
        this.locked = false
      }).catch(err => {
        pkg.trace('%s >> DB Error -> %s', err.message)
        this.locked = false
      })
    },
    timeout: 30,
    autoStart: true
  }
}
