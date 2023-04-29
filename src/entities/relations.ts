import {UserModel} from './user/user.model';
import {PostModel} from './post/post.model';


export async function setRelations() {
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
}