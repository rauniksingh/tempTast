const { createLogger, format, transports } = require('winston')
require('winston-daily-rotate-file')

const options = {
  file: {
    level: 'info',
    name: 'file.info',
    prepend: true,
    filename: require('path').join(process.cwd(), 'logs/%DATE%-combined.log'),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: '1h',
    colorize: true
  }
}

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json(),
    format.splat()
  ),
  transports: [
    new transports.DailyRotateFile(options.file)
  ],
  exitOnError: false // do not exit on handled exceptions
})

if (process.env.NODE_ENV !== 'production') {
  const console = new transports.Console()
  logger.add(console)
}

logger.stream = {
  write: function (message, encoding) {
    logger.error(message)
  }
}

module.exports = logger
