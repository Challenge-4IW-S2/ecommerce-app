import ProductRepositoryMongo from "../mongo/repository/ProductRepository.js";
import ProductRepository from "../postgresql/repository/ProductRepository.js";
import ProductPictureRepository from "../postgresql/repository/ProductPictureRepository.js";
import CategoryRepository from "../postgresql/repository/CategoryRepository.js";
import User from "../postgresql/models/user.js";
import Preference from "../postgresql/models/Preference.js";
import { sendEmail } from "./SendMailController.js";
import { newProductsTemplate } from "../mailsTemplates/newProducts.js";
import UserRepository from "../postgresql/repository/UserRepository.js";
import { newPriceTemplate } from "../mailsTemplates/NewPrice.js";
import StockEventRepository from "../postgresql/repository/StockEventRepository.js";
export class ProductController {
  static async index(request, response) {
    const productRepositoryMongo = new ProductRepositoryMongo();
    const page = request.query.page;
    const order = request.query.order;
    const categories = request.query.categories;
    const valueMin = request.query.valueMin;
    const valueMax = request.query.valueMax;

    const products = await productRepositoryMongo.getAllProducts(
      page,
      order,
      categories,
      valueMin,
      valueMax
    );
    response.json(products);
  }

  static async getMinAndMaxPrice(request, response) {
    const productRepositoryMongo = new ProductRepositoryMongo();
    const minMax = await productRepositoryMongo.getMinAndMaxPrice();
    response.json(minMax);
  }

  static async getProductsName(request, response) {
    const productRepositoryMongo = new ProductRepositoryMongo();
    const names = await productRepositoryMongo.getProductsName();
    response.json(names);
  }

  static async getProductBySlug(request, response) {
    const productRepositoryMongo = new ProductRepositoryMongo();
    const slug = request.params.slug;
    const product = await productRepositoryMongo.getProduct(slug);
    response.json(product);
  }

  static async search(request, response) {
    const productRepositoryMongo = new ProductRepositoryMongo();
    const search = request.query.search;
    const result = await productRepositoryMongo.searchProduct(search);
    response.json(result);
  }

  static async createProduct(request, response, next) {
    const parameters = {
      name: request.body.name,
      price_ht: request.body.price_ht,
      slug: request.body.slug,
      description: request.body.description,
      category: request.body.category_id,
      quantity: request.body.quantity,
      low_stock_threshold: request.body.low_stock_threshold,
    };
    try {
      const productRepository = new ProductRepository();
      const slugAlreadyExists = await productRepository.findByOtherField(
        "slug",
        parameters.slug
      );
      if (slugAlreadyExists) return response.sendStatus(400);
      const product = await productRepository.createProduct(parameters);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const newProductsToday = await productRepository.findAndCountAll(today);
      if (newProductsToday.count > 5) {
        const userRepo = new UserRepository();
        const users = await userRepo.findAllWithPreferences();
        for (const user of users) {
          const { to, subject } = {
            to: user.email,
            subject: "New Products Alert",
          };
          await sendEmail(to, subject, newProductsTemplate());
        }
      }

      // Stock event initial (premier stock_in = stock initial)
      const stockEventRepository = new StockEventRepository();
      await stockEventRepository.createStockEvent({
        product_id: product.id,
        event_type: "stock_in",
        stock_movement: product.quantity,
      });

      response.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }


    static async updateProduct(request, response,next) {
        const parameters = {
            name: request.body.name,
            price_ht: request.body.price_ht,
            slug: request.body.slug,
            description: request.body.description,
            category_id: request.body.category_id,
            quantity: request.body.quantity,
            low_stock_threshold: request.body.low_stock_threshold
        }

      const product = await productRepository.updateProduct(id, parameters);

      if (oldPrice > newPrice) {
        for (const user of usersPrefNew) {
          const { to, subject } = {
            to: user.email,
            subject: "Price Drop Alert",
          };
          await sendEmail(to, subject, newPriceTemplate(parameters));
        }
      }
      response.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(request, response, next) {
    try {
      const productRepository = new ProductRepository();
      const productPicture = new ProductPictureRepository();

      const nbDelete = await productRepository.deleteProduct(request.params.id);
      console.log(nbDelete);
      // if (nbDelete === 1) {
        
      //   // const productPictures = await productPicture.findByOtherField(
      //   //   "product_id",
      //   //   request.params.id
      //   // );
      //   // for (const picture in productPictures) {
      //   //   await productPicture.deleteProductPicture(picture.id);
      //   // }
      //   //response.sendStatus(204);
      // } else {
      //   //response.sendStatus(404);
      // }
    } catch (error) {
      next(error);
    }
  }
  static async getAllProducts(request, response) {
    try {
      const productRepository = new ProductRepository();
      const products = await productRepository.findAll();
      response.json(products);
    } catch (error) {
      response.json({
        message: error.message,
      });
    }
  }

  static async getProduct(request, response, next) {
    try {
      const productRepository = new ProductRepository();
      const product = await productRepository.findById(request.params.id);
      response.json(product);
    } catch (e) {
      next(e);
    }
  }
}
