import {UserModel} from './user/user.model';
import {PostModel} from './post/post.model';
import { Logger } from 'winston';


export async function setRelations(logger: Logger) {
    const relationsLogger = logger.child('Sequelize Relation');
   try{
    PostModel.belongsTo(UserModel, {
        as: 'author',
        onDelete: 'CASCADE',
        foreignKey: {
            name: 'authorID', 
            allowNull: false, 
        },
    });

    UserModel.hasMany(PostModel, {
        as: 'posts',
        onDelete: 'CASCADE',   
        foreignKey: {
            name: 'author', 
            defaultValue: []
        },
    })
    relationsLogger.debug('Relations build successfully')
   } catch(error) {
        throw new Error(error);
   }
}