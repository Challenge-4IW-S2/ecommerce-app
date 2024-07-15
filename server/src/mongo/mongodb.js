import mongoose from 'mongoose'

// import CategoryRepository from './Repository/CategoryRepository.js';
// import ProductRepository from './Repository/ProductRepository.js';
import ProductPictureRepository from './Repository/ProductImageRepository.js';
// import { randomUUID } from 'crypto';

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});

// const productRepository = new ProductRepository();
// const categoryRepository = new CategoryRepository();
const productPictureRepository = new ProductPictureRepository();

// categoryRepository.createCategory({
//     _id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922',
//     name: 'category',
// }).then((category) => {
//     console.log(category);
// });
// const categories = [
//     { _id: randomUUID(), name: 'category 1' },
//     { _id: randomUUID(), name: 'category 2' },
//     { _id: randomUUID(), name: 'category 3' },
//     { _id: randomUUID(), name: 'category 4' },
//     { _id: randomUUID(), name: 'category 5' }
// ];

// for (const category of categories) {
//     categoryRepository.createCategory(category).then((category) => {
//         console.log(category);
//     });
// }

// productRepository.createProduct({
//     _id: 'fb0f1efb-0ad7-4cca-bba5-03e1a80b5f15',
//     name: 'product 2',
//     description: 'description 2',
//     price_ht: 12,
//     price_ttc: 14.4,
//     is_active: true,
//     token: 'token 2',
//     category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
// }).then((product) => {
//     console.log(product);
// });

// const newProducts = [
//     { 
//         _id: randomUUID(), 
//         name: 'product 11', 
//         description: 'description 11', 
//         price_ht: 20, 
//         price_ttc: 24, 
//         is_active: true, 
//         token: 'token 11', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922' 
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 12', 
//         description: 'description 12', 
//         price_ht: 15, 
//         price_ttc: 18, 
//         is_active: true, 
//         token: 'token 12', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922' 
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 13', 
//         description: 'description 13', 
//         price_ht: 10, 
//         price_ttc: 12, 
//         is_active: true,
//         token
//         : 'token 13',
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 14', 
//         description: 'description 14', 
//         price_ht: 18, 
//         price_ttc: 21.6, 
//         is_active: true, 
//         token: 'token 14', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 15', 
//         description: 'description 15', 
//         price_ht: 25, 
//         price_ttc: 30, 
//         is_active: true, 
//         token: 'token 15', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922' 
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 16', 
//         description: 'description 16', 
//         price_ht: 30, 
//         price_ttc: 36, 
//         is_active: true, 
//         token: 'token 16', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 17', 
//         description: 'description 17', 
//         price_ht: 22, 
//         price_ttc: 26.4, 
//         is_active: true, 
//         token: 'token 17', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 18', 
//         description: 'description 18', 
//         price_ht: 16, 
//         price_ttc: 19.2, 
//         is_active: true, 
//         token: 'token 18', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 19', 
//         description: 'description 19', 
//         price_ht: 28, 
//         price_ttc: 33.6, 
//         is_active: true, 
//         token: 'token 19', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
//     },
//     { 
//         _id: randomUUID(), 
//         name: 'product 20', 
//         description: 'description 20', 
//         price_ht: 14, 
//         price_ttc: 16.8, 
//         is_active: true, 
//         token: 'token 20', 
//         category_id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922'
//     }
// ];

// for (const product of newProducts) {
//     productRepository.createProduct(product).then((product) => {
//         console.log(product);
//     });
// }

// productPictureRepository.createProductPicture({
//     _id: '808621d8-7e75-4079-941b-ebf9ee889ae3',
//     url: 'placeholderimage.webp',
//     product_id: '808621d8-7e75-4079-941b-ebf9ee889ae3'
// }).then((productPicture) => {
//     console.log(productPicture);
// });
