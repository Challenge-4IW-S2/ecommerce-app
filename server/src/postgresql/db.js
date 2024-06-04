import Sequelize from 'sequelize';

const connection = new Sequelize(process.env.DATABASE_URL);

connection.authenticate().then(() => {
    console.log('Connected to PostgreSQL');
});

export default { connection };