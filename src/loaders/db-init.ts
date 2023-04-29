import { dbConnect, sequelize } from './db';
import { setRelations } from '../entities/relations';


export async function connectAndInitDB() {
    try{
        await dbConnect();
        await setRelations();
        await sequelize.sync({alter: true});
    } catch(error) {
        console.error(error);
    }
}