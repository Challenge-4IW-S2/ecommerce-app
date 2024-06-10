import mongoose from 'mongoose'
import Product from './model/Product.js';
import fs from 'fs';
import csvParser from 'csv-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const csvFilePath = path.join(__dirname, './data/products.csv');

fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', async (row) => {
        await Product.create(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});
