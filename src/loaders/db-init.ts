import { Logger } from 'winston';

import { dbConnect, sequelize } from './db';
import { setRelations } from '../entities/relations';


export async function connectAndInitDB(logger: Logger) {
    const sequelizeLogger = logger.child('Sequelize');
    try{
        await dbConnect(logger);
        await setRelations(logger);
        await sequelize.sync({alter: true});
        sequelizeLogger.info('Data is synchronized successfully')
    } catch(error) {
       throw new Error(error);
    }
}