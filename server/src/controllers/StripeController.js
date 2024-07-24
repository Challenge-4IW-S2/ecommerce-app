import Stripe from 'stripe';
import dotenv from 'dotenv';
import UserRepository from "../postgresql/repository/UserRepository.js";
import AddressRepository from "../postgresql/repository/AdressRepository.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const StripeController = {
    async createCheckoutSession(req, res) {
        try {
            const userRepository = new UserRepository();
            const addressRepository = new AddressRepository();
            const user = await userRepository.findByPk(req.user.id);
            const address = await addressRepository.findByUserId(user.id);

            const customers = await stripe.customers.list({ email: user.email, limit: 1 });
            let customer;

            if (customers.data.length === 0) {
                // Update existing customer
                customer = await stripe.customers.create({
                    email: user.email,
                    phone: user.phone,
                    name: `${user.firstname} ${user.lastname}`,
                });
            }   else {
                customer = customers.data[0];
            }
            const items = req.body.items;

            const metadata = items.reduce((acc, item) => {
                acc[item.id] = item.quantity;
                return acc;
            }, {});


            const sessionData = {
                customer: customer.id,
                payment_method_types: ['card'],
                line_items: items.map(item => ({
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            id: item.id,
                            name: item.name,
                            metadata: { productId: item.id }
                        },
                        unit_amount: item.price_ttc * 100,
                    },
                    quantity: item.quantity,


                })),
                metadata: metadata,
                mode: 'payment',
                success_url: `${process.env.APP_BASE_URL}/products`,
                cancel_url: `${process.env.APP_BASE_URL}/products`,
                locale: 'fr',
                shipping_address_collection: {
                    allowed_countries: ['FR'],
                }

            };

            const session = await stripe.checkout.sessions.create(sessionData);



            try {
                const sessionDetails = await stripe.checkout.sessions.retrieve(session.id);
            } catch (error) {
                // Gérer l'erreur de manière appropriée
            }


            res.json({ id: session.id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};