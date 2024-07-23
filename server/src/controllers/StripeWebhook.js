import express from 'express';
import stripePackage from 'stripe';
import ProductRepository from "../postgresql/repository/ProductRepository.js";

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY); // Utilisez votre clé secrète Stripe
 class StripeWebhook {
     static async handleWebhook(req, res) {
         const sig = req.headers['stripe-signature'];
         const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Utilisez votre propre secret de webhook

         let event;

         try {
             event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
             console.log("Webhook event constructed:", event);
         } catch (err) {
             console.error("Webhook signature verification failed.", err.message);
             return res.status(400).send(`Webhook Error: ${err.message}`);
         }

         if (event.type === 'checkout.session.completed') {
             console.log("Checkout session completed event received");
             const session = event.data.object;
             const items = JSON.parse(session.metadata.items); // Les métadonnées contenant les infos des produits achetés

             for (const item of items) {
                 const productId = item.id;
                 const quantity = item.quantity;
                 try {
                     const productRepository = new ProductRepository();

                     // Mettez à jour la quantité du produit dans la base de données
                        await productRepository.updateProduct(productId, { quantity:quantity });


                     console.log(`Updated product ID: ${productId} with quantity: ${quantity}`);
                 } catch (error) {
                     console.error(`Failed to update product quantity for product ${productId}: ${error}`);
                 }
             }
         } else {
             console.log(`Unhandled event type ${event.type}`);
         }

         res.json({received: true});
     }
 }

export { StripeWebhook };