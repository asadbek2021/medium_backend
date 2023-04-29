import { Logger } from 'winston';

import { dbConnect, sequelize } from './db';
import { setRelations } from '../entities/relations';


export async function connectAndInitDB(logger: Logger) {
    try{
        await dbConnect(logger);
        await setRelations(logger);
        await sequelize.sync({alter: true});
    } catch(error) {
       throw new Error(error);
    }
}