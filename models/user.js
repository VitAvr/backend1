import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class User extends Model {}
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        avatarUrl: { type: DataTypes.STRING },
        role: { type: DataTypes.STRING },
    },
    {
        sequelize: db,
        tableName: 'users',
        freezeTableName: true,
        modelName: 'User',
        timestamps: true,
    },
);

export default User;
