import ProductModel from "../model/Product.js";

export default class ProductRepository {
    constructor() {
        this.Product = ProductModel;
    }

    createProduct(product) {
        return this.Product.create(product);
    }

    searchProduct(search) {
        // return this.Product.find({
        //     $or: [
        //         {
        //             name: {
        //                 $regex: search,
        //                 $options: 'i',
        //             }
        //         },
        //         {
        //             description: {
        //                 $regex: search,
        //                 $options: 'i',
        //             }
        //         }
            
        //     ],
        //     $and: [
        //         {
        //             is_active: true
        //         }
        //     ]
        // });
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