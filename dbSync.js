const { Client } = require('pg');
const { MongoClient } = require('mongodb');

// Connect to PostgreSQL
const pgClient = new Client({
    connectionString: 'postgres://luzaya_user:luzaya_password@db:5432/luzaya_db'
});
pgClient.connect();

// Connect to MongoDB
const mongoClient = new MongoClient('mongodb://luzaya_mongodb_root_user:luzaya_mongodb_root_password@mongodb:27017');
mongoClient.connect();

// List of tables to monitor
const tables = ['table1', 'table2', 'table3'];

// Listen for changes in each table
tables.forEach((table) => {
    pgClient.query(`LISTEN ${table}_changes`);
    pgClient.on('notification', async (message) => {
        // Check if the notification is for this table
        if (message.channel === `${table}_changes`) {
            // Parse the message from PostgreSQL
            const data = JSON.parse(message.payload);

            // Transform the data for MongoDB and insert it
            const collection = mongoClient.db('mydatabase').collection(table);
            await collection.insertOne(transformData(data));
        }
    });
});

// This function should transform the data from the PostgreSQL format to the MongoDB format
function transformData(data) {
    // Implement this function based on your specific needs
}