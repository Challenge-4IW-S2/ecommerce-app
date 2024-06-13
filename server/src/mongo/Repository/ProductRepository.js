import ProductModel from "../models/Product.js";

export default class ProductRepository {
    constructor() {
        this.Product = ProductModel;
    }

    createProduct(product) {
        return this.Product.create(product);
    }

    getAllProducts() {
        return this.Product.aggregate()
            .lookup(
                {
                    from: 'categories',
                    localField: 'category_id',
                    foreignField: '_id',
                    as: 'category',
                },
            )
            .lookup(
                {
                    from: 'productpictures',
                    localField: '_id',
                    foreignField: 'product_id',
                    as: 'pictures',
                }
            )
            .project(
                {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price_ttc: 1,
                    is_active: 1,
                    category: 1,
                    pictures: 1,
                }
            )
            .match(
                {
                    is_active: true
                }
            )
    }

    searchProduct(search) {
        return this.Product.aggregate()
        .lookup(
            {
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category',
            },
        )
        .lookup(
            {
                from: 'productpictures',
                localField: '_id',
                foreignField: 'product_id',
                as: 'pictures',
            }
        )
        .project(
            {
                _id: 1,
                name: 1,
                description: 1,
                price_ttc: 1,
                is_active: 1,
                category: 1,
                pictures: 1,
            }
        )
        .match(
            {
                $or: [
                    {
                        name: {
                            $regex: search,
                            $options: 'i',
                        }
                    },
                    {
                        description: {
                            $regex: search,
                            $options: 'i',
                        }
                    }
                
                ],
                $and: [
                    {
                        is_active: true
                    }
                ]
            }
        )
    }
}