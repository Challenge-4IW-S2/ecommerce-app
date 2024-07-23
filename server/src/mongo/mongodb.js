import mongoose from 'mongoose'
import express from 'express';
import Product from './models/product.js';

const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});