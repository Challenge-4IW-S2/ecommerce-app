import express from "express";
import cors from "cors";
import "./src/mongo/mongodb.js";
import cookieParser from "cookie-parser";
import RouteLoader from "./RouteLoader.js";
const app = express();
const port = 8000;
import stripePackage from "stripe";
import {ProductController} from "./src/controllers/ProductController.js";
import {OrderController} from "./src/controllers/OrderController.js";
import OrderRepository from "./src/postgresql/repository/OrderRepository.js";
import UserRepository from "./src/postgresql/repository/UserRepository.js";
import ProductRepository from "./src/postgresql/repository/ProductRepository.js";
const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
app.use(cookieParser(process.env.JWT_SECRET));
app.post('/stripe-webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;

        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {limit: 100});

          // recuperer le nom du produit depuis lineItems.data

          const product = lineItems.data[0].description;

          const productRepository = new ProductRepository();
            const productFound = await productRepository.findByOtherField('name', product);


              //modifier la quantité du produit dans la base de données
          for (const lineItem of lineItems.data) {
            // Assuming the product name is stored in `description` and can be used to find the product
            const productName = lineItem.description;
            const productFound = await productRepository.findByOtherField('name', productName);

            if (productFound) {
              const productQuantity = productFound.quantity - lineItem.quantity;
              lineItem.product_id = productFound.id; // Assign the found product's ID
              await productRepository.updateProduct(productFound.id, {quantity: productQuantity});
            }
          }


          const userRepository = new UserRepository();
          const user = await userRepository.findOne('email', session.customer_details.email);

          const order = {
            user_id: user.id ,
            total_price: session.amount_total,
            status: 'paid',
            invoice: JSON.stringify(lineItems.data)
          };

          const orderRepository = new OrderRepository();

          const createOrderResult = await orderRepository.createOrder(order);

        } catch (processError) {
          console.error('Error processing order:', processError);
          // Consider adding more specific error handling or recovery logic here
        }
        break;
      default:

    }

    response.send({received: true});
  } catch (err) {
    console.error('Webhook handler error:', err);
    response.status(400).send(`Webhook Error: ${err.message}`);
  }
});


const corsOptions = {
  origin: true,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
const routes = await RouteLoader('src/routes/*.js');
app.use('/', routes);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server listening on http://localhost:${port}`);
});
