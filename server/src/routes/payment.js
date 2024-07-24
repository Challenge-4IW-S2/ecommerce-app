import { StripeController } from '../controllers/StripeController.js';
import checkAuth from "../middlewares/checkAuth.js";
// import express from 'express';

export default function (router) {
    router.post('/create-payment-intent', checkAuth(), StripeController.createCheckoutSession);
    return router;
}