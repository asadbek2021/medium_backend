import {DataTypes} from 'sequelize';

import { sequelize } from "../../loaders";
import { Post } from './post';



export const PostModel = Post.init({
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        validate: {
            len: [14, 34]
        }
    },
    content: {
        type: DataTypes.STRING,
        validate: {
            len: [40, 400],
        },
    },
    authorId: {
        type: DataTypes.INTEGER
    }
}, {modelName: 'post', sequelize, updatedAt: true, createdAt: true})