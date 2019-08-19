const path = require('path')
const winston = require('winston')

const logsDir = path.resolve(__dirname, '../logs')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.uncolorize()
  ),
  transports: [
    new winston.transports.File({
      level: 'error',
      filename: path.join(logsDir, 'error.log'),
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'info.log'),
    })
  ],
  exitOnError: false
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({ level: 'debug' }))
}

logger.stream = {
  write: (message) => {
    logger.info(message.trim())
  }
}

module.exports = logger
