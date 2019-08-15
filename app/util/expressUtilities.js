const boom = require('boom')

exports.asyncMiddleware = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    if (err.isJoi)
      return next(boom.badRequest(err))

    if (!err.isBoom)
      return next(boom.badImplementation(err))

    next(err)
  })
}
