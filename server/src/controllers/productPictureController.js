import ProductPictureRepository from "../postgresql/Repository/ProductPictureRepository.js";
export class productPictureController {
    static async createProductPicture(req, res, next) {
        const params= {
            product_id: req.body.product_id,
            url: req.body.url
        }
        try {
            const productPictureRepository = new ProductPictureRepository();
            const productPicture = await productPictureRepository.createProductPicture(params);
            res.json(productPicture);
        }catch (e) {
            next(e);
        }
    }
    static async getAllProductPictures(req, res, next) {
        try {
            const productPictureRepository = new ProductPictureRepository();
            const productPictures = await productPictureRepository.findAll();
            res.json(productPictures);
        }catch (e){
            next(e);
        }
    }
    static async getProductPicture(req, res, next) {
        try {
            const productPictureRepository = new ProductPictureRepository();
            const productPicture = await productPictureRepository.findByOtherField("product_id",req.params.productId);
            res.json(productPicture);
        }catch (e){
            next(e);
        }
    }


    static async deleteProductPicture(req, res, next) {
        try {
            const productPictureRepository = new ProductPictureRepository();
            const nbDeleted = await productPictureRepository.deleteProductPicture(req.params.id);
            if (nbDeleted === 1) {
                res.sendStatus(201);
            } else {
                res.sendStatus(404);
            }
        }catch (e){
            next(e);
        }
    }

    static async getProductPictureById(req,res,next) {
        try {
            const productPictureRepository = new ProductPictureRepository();
            const productPicture = await productPictureRepository.findById(req.params.id);
            if (productPicture) {
                res.json(productPicture);
            } else {
                res.sendStatus(404);
            }
        }catch (e){
            next(e);
        }

    }
}