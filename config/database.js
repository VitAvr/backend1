import { Sequelize } from "sequelize";

const db = new Sequelize('lfa_va', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

export default db;