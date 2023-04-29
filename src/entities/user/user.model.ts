import {DataTypes} from 'sequelize';
import { sequelize } from "../../loaders";



export const UserModel = sequelize.define('user', {
    id: {
        type: DataTypes.NUMBER,
        unique: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
            notIn: [['test@mail.com','test@mail.ru']]
        }
    },
    password: {
        type: DataTypes.NUMBER,
        validate: {
            len: [6, 14],
            isInt: true
        },
    },
}, {timestamps: false})