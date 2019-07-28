const { ErrorModel } = require('../models/resModel')

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }
  res.send(new ErrorModel('未登录'))
}