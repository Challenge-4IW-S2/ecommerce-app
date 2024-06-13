import mongoose from 'mongoose'
import CategoryRepository from './Repository/CategoryRepository.js';
import ProductRepository from './Repository/ProductRepository.js';
import ProductPictureRepository from './Repository/ProductImageRepository.js';

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
});

// const productRepository = new ProductRepository();
// const categoryRepository = new CategoryRepository();
// const productPictureRepository = new ProductPictureRepository();

// categoryRepository.createCategory({
//     _id: 'f7e22e1a-18ec-4517-9c70-48f3f36b9922',
//     name: 'category',
// }).then((category) => {
//     console.log(category);
// });

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

// productPictureRepository.createProductPicture({
//     _id: '6cd4dcad-d7ec-48e6-a5f2-240c1c5d0c85',
//     url: 'placeholderimage.webp',
//     product_id: 'fb0f1efb-0ad7-4cca-bba5-03e1a80b5f15'
// }).then((productPicture) => {
//     console.log(productPicture);
// });
