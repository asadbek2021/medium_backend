import {Sequelize, } from 'sequelize';

import * as Config from '../config';
import { setRelations } from '../entities/relations';

export const sequelize = new Sequelize({
    host: Config.DB.HOST,
    database: Config.DB.NAME,
    dialect: 'sqlite',
    port: Config.DB.PORT,
    username: Config.DB.USERNAME,
    password: Config.DB.PASSWORD
})


export async function dbConnect() {
    try {
        await sequelize.authenticate();
        await setRelations();
    } catch(error) {
        return new Error(error);
    }
}