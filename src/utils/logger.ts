import winston from "winston";

import * as Config from '../config';

const transports = {
    console: new winston.transports.Console({level: 'info'}),
    file: new winston.transports.File({filename: 'error.log',level: 'error'})
};


export const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.colorize({all: true})
    ),
    level: Config.LOG_LEVEL,
    transports: [
        transports.console,
        transports.file
    ]
})

