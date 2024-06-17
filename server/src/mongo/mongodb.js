import mongoose from 'mongoose'
import CategoryRepository from './Repository/CategoryRepository.js';
import ProductRepository from './Repository/ProductRepository.js';
import ProductPictureRepository from './Repository/ProductImageRepository.js';

// import Product from './model/Product.js';
// import fs from 'fs';
// import csvParser from 'csv-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const csvFilePath = path.join(__dirname, './data/products.csv');

// fs.createReadStream(csvFilePath)
//     .pipe(csvParser())
//     .on('data', async (row) => {
//         await Product.create(row);
//     })
//     .on('end', () => {
//         console.log('CSV file successfully processed');
//     });

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});

const productRepository = new ProductRepository();
// const categoryRepository = new CategoryRepository();
// const productPictureRepository = new ProductPictureRepository();

// categoryRepository.createCategory({
//     _id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922',
//     name: 'category',
// }).then((category) => {
//     console.log(category);
// });

// productRepository.createProduct({
//     _id: '7b57bea3-c594-40b1-b7ce-a41803813192',
//     name: 'product',
//     description: 'description',
//     price_ht: 10,
//     price_ttc: 12,
//     is_active: true,
//     token: 'token',
//     category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
// }).then((product) => {
//     console.log(product);
// });
// productPictureRepository.createProductPicture({
//     _id: 'ae2e8274-865b-4614-bb0a-439077eeadb3',
//     url: 'placeholderimage.webp',
//     product_id: '7b57bea3-c594-40b1-b7ce-a41803813192'
// }).then((productPicture) => {
//     console.log(productPicture);
// });

// productRepository.searchProduct('de').then((products) => {
//     products.forEach((product) => {
//     console.log(`Nom: ${product.name}`);
//     console.log(`Description: ${product.description}`);
//     console.log(`Prix TTC: ${product.price_ttc}`); 
//     if (product.category && product.category.length > 0) {
//         console.log(product.category[0].name);
//     }
//     if (product.pictures && product.pictures.length > 0) {
//         // product.pictures.forEach((picture) => {
//         //     console.log(picture.url);
//         // });
//         console.log(product.pictures[0].url);
//     }
//     console.log('---');
//     });
// });