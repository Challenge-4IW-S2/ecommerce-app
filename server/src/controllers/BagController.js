import BagRepository from "../mongo/Repository/BagRepository.js";

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
                products: [{
                    productId: 'bc459b2d-351f-4a88-bb19-6ca43a22020a',
                    quantity: 1,
                    color: 'blue',
                    size: 'M',
                }],
            }).then((data) => {
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
    // static async updateBag(request, response) {
    //     try {
    //         const bagRepository = new BagRepository();
    //         const sessionId = request.params.sessionId;
    //         const bag = request.body;
    //         await bagRepository.updateBag(sessionId, bag).then((data) => {
    //             response.json({
    //                 data,
    //             });
    //         });
    //     } catch (error) {
    //         response.json({
    //             message: error.message,
    //         });
    //     }
    // }
}