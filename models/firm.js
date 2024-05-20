import db from '../config/database.js';
import { DataTypes, Model } from 'sequelize';

class Firm extends Model {}
Firm.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        link: { type: DataTypes.STRING },
        logoUrl: { type: DataTypes.STRING },
        cities: { type: DataTypes.STRING },
        languages: { type: DataTypes.STRING },
    },
    {
        sequelize: db,
        tableName: 'firms',
        freezeTableName: true,
        modelName: 'Firm',
        timestamps: true,
    },
);

export default Firm;