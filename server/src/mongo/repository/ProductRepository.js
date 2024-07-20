import ProductModel from "../models/Product.js";

export default class ProductRepository {
    constructor() {
        this.Product = ProductModel;
    }

    async createOrUpdateProduct(product) {
        return this.Product.findByIdAndUpdate(product.id, {
            name: product.name,
            description: product.description,
            price_ht: product.price_ht,
            price_ttc: product.price_ttc,
            is_active: product.is_active,
            slug: product.slug,
            category_id: product.category_id,
        }, {
            upsert: true,
            new: true,
        });
    }

    async deleteProduct(productId) {
        return this.Product.findByIdAndDelete(productId);
    }

    async getAllProducts(page, order, categories, valueMin, valueMax, names) {

        // nombre total de pages ( ex : 100 / 10 = 10)
        const totalProducts = await this.Product.countDocuments({ is_active: true });
        const totalPagesResults = Math.ceil(totalProducts / 10);

        // gestion de l'ordre
        let orderBy;
        switch (order) {
            case 'relevance': {
                orderBy = { _id: 1 };
                break;
            }
            case 'price_asc':
                orderBy = { price_ttc: 1 };
                break;
            case 'price_desc':
                orderBy = { price_ttc: -1 };
                break;
            case 'date_asc':
                orderBy = { created_at: 1 };
                break;
            case 'date_desc':
                orderBy = { created_at: -1 };
                break;
            default:
                orderBy = { _id: 1 };
                break;
        }

        // gestion de la catégorie
        const categoryFilter = categories && categories.length ? { "category.name": { $in: categories } } : {};

        // gestion des noms 
        const nameFilter = names && names.length ? { name: { $in: names } } : {};

        // récupération des produits
        const productsResults = await this.Product.aggregate()
            .lookup({
                from: 'categories',
                localField: 'category_id',
                foreignField: '_id',
                as: 'category',
            })
            .lookup({
                from: 'productpictures',
                localField: '_id',
                foreignField: 'product_id',
                as: 'pictures',
            })
            .sort(orderBy)
            .project({
                _id: 1,
                name: 1,
                description: 1,
                price_ttc: 1,
                is_active: 1,
                category: 1,
                pictures: 1,
                slug: 1,
            })
            .match({
                is_active: true,
                ...categoryFilter,
                ...nameFilter,
                price_ttc: { $gte: Number(valueMin), $lte: Number(valueMax) }
            })
            .limit(Number(page))

        return { productsResults, totalPagesResults };
    }

    async getMinAndMaxPrice() {
        return this.Product.aggregate().group({
            _id: null,
            min: { $min: "$price_ttc" },
            max: { $max: "$price_ttc" }
        })
    }

    async getProductsName() {
        return this.Product.find({}, 'name -_id');
    }

    getProduct(slug) {
        return this.Product.aggregate()
        .lookup({
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category',
        })
        .lookup({
            from: 'productpictures',
            localField: '_id',
            foreignField: 'product_id',
            as: 'pictures',
        })
        .project({
            _id: 1,
            name: 1,
            description: 1,
            price_ttc: 1,
            is_active: 1,
            category: 1,
            pictures: 1,
            slug: 1,
        })
        .match({
            slug: slug,
            is_active: true
        })
    }

    searchProduct(search) {
        return this.Product.aggregate()
        .lookup({
            from: 'categories',
            localField: 'category_id',
            foreignField: '_id',
            as: 'category',
        })
        .lookup({
            from: 'productpictures',
            localField: '_id',
            foreignField: 'product_id',
            as: 'pictures',
        })
        .project({
            _id: 1,
            name: 1,
            description: 1,
            price_ttc: 1,
            is_active: 1,
            category: 1,
            pictures: 1,
            slug: 1,
        })
        .match({
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {description: {$regex: search, $options: 'i'}}
                ],
            $and: [
                    {is_active: true}
                ]
        })
    }
}