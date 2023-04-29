import {DataTypes} from 'sequelize';
import { sequelize } from "../../loaders";



export const PostModel = sequelize.define('post', {
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
            len: [30, 400],
        },
    }
}, {timestamps: true})