import {UserModel} from './user/user.model';
import {PostModel} from './post/post.model';
import { Logger } from 'winston';


export async function setRelations(logger: Logger) {
    const relationsLogger = logger.child('Sequelize Relation');
   try{
    
    UserModel.hasMany(PostModel, {
        foreignKey: 'authorId',
    })
    PostModel.belongsTo(UserModel, {
        foreignKey: 'authorId',
    });
    relationsLogger.debug('Relations build successfully')
   } catch(error) {
        throw new Error(error);
   }
}