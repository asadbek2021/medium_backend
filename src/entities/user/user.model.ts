import { DataTypes } from 'sequelize';

import { sequelize } from '../../loaders';
import { User } from './user';

export const UserModel = User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notIn: [['test@mail.com', 'test@mail.ru']],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
  },
  { sequelize, modelName: 'user', createdAt: false, updatedAt: false }
);
