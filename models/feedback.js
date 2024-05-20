import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';
import User from './user.js';

class Feedback extends Model { }
Feedback.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: { type: DataTypes.INTEGER },
        text: { type: DataTypes.STRING },        
    },
    {
        sequelize: db,
        tableName: 'feedback',
        freezeTableName: true,
        modelName: 'Feedback',
        timestamp: true,
    },
);
//определим связи между таблицами
Feedback.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Feedback, { as: 'feedback', foreignKey: 'userId' });

export default Feedback;