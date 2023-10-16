const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
