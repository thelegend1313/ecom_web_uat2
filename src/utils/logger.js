
// 1
import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logDir = 'logs';
const logName = 'demo-winston.log';
const transports = [];
// 3
transports.push(new winston.transports.Console());
// 4
if ( !fs.existsSync(logDir) ) {
  //fs.mkdirSync(logDir);
}
const logFile = path.join(logDir, logName);
console.log(logFile)
transports.push(new winston.transports.File({ filename: logFile }));
// 5
const logger = new winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.printf(info => `[${info.timestamp}] [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: transports
});
// 6

export default logger;