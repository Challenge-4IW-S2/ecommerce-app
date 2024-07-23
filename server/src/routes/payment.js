import { StripeController } from '../controllers/StripeController.js';
import { StripeWebhook } from '../controllers/StripeWebhook.js';
import checkAuth from "../middlewares/checkAuth.js";

export default function (router) {
    router.post('/create-payment-intent', checkAuth(), StripeController.createCheckoutSession);
    router.post('/stripe-webhook', checkAuth(), StripeWebhook.handleWebhook);

    return router;
}