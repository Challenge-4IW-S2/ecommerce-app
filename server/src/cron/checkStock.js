import {CronJob} from 'cron';
import {sendEmail} from "../controllers/SendMailController.js";
import UserRepository from "../postgresql/repository/UserRepository.js";
import {lowStockTemplate} from "../mailsTemplates/lowStock.js";
import ProductRepository from "../postgresql/repository/ProductRepository.js";
import StockEventRepository from "../postgresql/repository/StockEventRepository.js";

const checkStock = new CronJob('* * * * *', async () => {
        try {
            console.log('Checking stock levels...')
            const userRepo = new UserRepository();
            const users = await userRepo.findAllByRole('ROLE_STORE_KEEPER');
                const productRepository = new ProductRepository();
                const products = await productRepository.findAll();

                for (const product of products) {
                    
                    if (product.quantity <= product.low_stock_threshold) {
                        const stockEventRepository = new StockEventRepository();
                        await stockEventRepository.createStockEvent({
                            product_id: product.id,
                            event_type: 'low_stock',
                            stock_level: product.quantity,
                        });

                        if (!users.length) {
                            console.log('No stock keepers found')
                        }
                        for (const user of users) {
                            const {to, subject} = {
                                to: user.email,
                                subject: 'Low Stock Alert',
                            };
                            await sendEmail(to, subject, lowStockTemplate(product));
                        }
                    }
                }
            } catch (error) {
            console.error('Error checking stock levels:', error);
        }
    }
);
checkStock.start();

export default checkStock;

