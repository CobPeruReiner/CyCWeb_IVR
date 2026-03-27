const fs = require("fs");
const { createLogger, format, transports } = require("winston");

// Asegúrate que el directorio exista
const logDir = "/app/logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      (info) =>
        `${info.timestamp} - ${info.level.toUpperCase()}: ${info.message}`
    )
  ),
  transports: [
    new transports.File({ filename: `${logDir}/error.log`, level: "error" }),
    new transports.File({ filename: `${logDir}/combined.log` }),
    new transports.Console(),
  ],
});

// Captura todos los tipos de console
const timers = {};

console.log = (...args) => logger.info(args.join(" "));
console.info = (...args) => logger.info(args.join(" "));
console.warn = (...args) => logger.warn(args.join(" "));
console.error = (...args) => logger.error(args.join(" "));

console.time = (label) => {
  timers[label] = Date.now();
};

console.timeEnd = (label) => {
  if (timers[label]) {
    const duration = Date.now() - timers[label];
    logger.info(`${label}: ${duration} ms`);
    delete timers[label];
  } else {
    logger.warn(`No se encontró un timer con la etiqueta: ${label}`);
  }
};

module.exports = logger;
