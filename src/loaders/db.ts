import {Sequelize, } from 'sequelize';

import * as Config from '../config';
import { Logger } from 'winston';

export const sequelize = new Sequelize({
    host: Config.DB.HOST,
    database: Config.DB.NAME,
    dialect: 'sqlite',
    port: Config.DB.PORT,
    username: Config.DB.USERNAME,
    password: Config.DB.PASSWORD
})


export async function dbConnect(logger: Logger) {
    const dbLogger = logger.child({module: 'SQLite'})
    try {
        await sequelize.authenticate();
        dbLogger.info('Connected to SQLite successfully')
    } catch(error) {
        return new Error(error);
    }
}