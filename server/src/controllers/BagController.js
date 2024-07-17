import BagRepository from "../mongo/repository/BagRepository.js";

export class BagController {
    static async getBag(request, response) {
        try {
            const bagRepository = new BagRepository();
            const sessionId = request.query.sessionId;
            await bagRepository.getBag(sessionId).then((data) => {
                response.json({
                    data,
                });
            });
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async createBag(request, response) {
        try {
            const bagRepository = new BagRepository();
            const sessionId = request.body.sessionId;
            bagRepository.createBag({
                sessionId,
                products: []
            })
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async updateBagSessionId(request, response) {
        try {
            const bagRepository = new BagRepository();
            const oldSessionId = request.body.oldSessionId;
            const newSessionId = request.body.newSessionId;
            await bagRepository.updateSessionId(oldSessionId, newSessionId)
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async addProduct(request, response) {
        try {
            const bagRepository = new BagRepository();
            const sessionId = request.body.sessionId;
            const product = request.body.product;
            await bagRepository.addProduct(sessionId, product);
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async updateProduct(request, response) {
        try {
            const bagRepository = new BagRepository();
            const sessionId = request.body.sessionId;
            const product = request.body.product;
            await bagRepository.updateProduct(sessionId, product);
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async removeProduct(request, response) {
        try {
            const bagRepository = new BagRepository();
            const sessionId = request.body.sessionId;
            const productId = request.body.productId;
            await bagRepository.removeProduct(sessionId, productId);
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }

    static async deleteBag(request, response) {
        try {
            const bagRepository = new BagRepository();
            const sessionId = request.query.sessionId;
            await bagRepository.deleteBagProducts(sessionId);
        } catch (error) {
            response.json({
                message: error.message,
            });
        }
    }
}