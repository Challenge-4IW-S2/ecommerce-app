import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const StripeController = {
    async createCheckoutSession(req, res) {
        try {

            const metadata = items.reduce((acc, item) => {
                acc[item.id] = item.quantity;
                return acc;
            }, {});

            const { items } = req.body; // Assurez-vous que les articles sont validés et nettoyés
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: items.map(item => ({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: item.name,
                            metadata: { productId: item.id } // Ajoutez l'ID du produit ici si nécessaire
                        },
                        unit_amount: item.price_ttc * 100,
                    },
                    quantity: item.quantity,
                })),
                metadata: metadata, // Ajoutez les métadonnées ici
                mode: 'payment',
                success_url: `http://localhost`,
                cancel_url: `https://google.com`,
                locale: 'fr',
            });

            console.log('Session de paiement créée avec succès:', session.id);
            res.json({ id: session.id });
        } catch (error) {
            console.error('Erreur lors de la création de la session de paiement:', error.message);
            res.status(500).json({ error: error.message });
        }
    }
};