import db from './db.js';
import UserRoleModel from "./models/UserRole.js";
import UserModel from "./models/User.js";
import AdressModel from "./models/Address.js";
import CategoryModel from "./models/Category.js";
import OrderModel from "./models/Order.js";
import WishlistModel from "./models/Wishlist.js";
import ProductModel from './models/Product.js';
import ProductPictureModel from './models/ProductPicture.js';
import CommentModel from './models/Comment.js';
import { v4 as uuidv4 } from "uuid";

const UserRole = UserRoleModel(db.connection);
const User = UserModel(db.connection);
const Adress = AdressModel(db.connection);
const Category = CategoryModel(db.connection);
const Order = OrderModel(db.connection);
const Wishlist = WishlistModel(db.connection);
const Product = ProductModel(db.connection);
const ProductPicture = ProductPictureModel(db.connection);
const Comment = CommentModel(db.connection);

const userRoles = ['ROLE_ADMIN', 'ROLE_STORE_KEEPER', 'ROLE_COMPTA', 'ROLE_USER'];

async function init() {
    await UserRole.sync({ force: false }).then(async () => {
        console.log("Table user_role created");
        const count = await UserRole.count();
        if (count === 0) {
            for (const role of userRoles) {
                await UserRole.create({
                    id: uuidv4(),
                    name: role
                }).then(() => {
                    console.log(`Role ${role} created`);
                }).catch((err) => {
                    console.log(`Error creating role ${role}: ${err}`);
                });
            }
        }
    });

    await User.sync({ force: false }).then(() => {
        console.log("Table User created");
    });

    await Adress.sync({ force: false }).then(() => {
        console.log("Table Adress created");
    });

    await Order.sync({ force: false }).then(() => {
        console.log("Table Order created");
    });

    await Wishlist.sync({ force: false }).then(() => {
        console.log("Table Wishlist created");
    });

    await Category.sync({ force: false }).then(async () => {
        console.log("Table categories created");
    });

    await Product.sync({ force: false }).then(async () => {
        console.log("Table products created");
    });

    await ProductPicture.sync({ force: false }).then(async () => {
        console.log("Table product_pictures created");
    });

    await Comment.sync({ force: false }).then(async () => {
        console.log("Table comments created");
    });
}

init();

export default {
    connection: db.connection,
    UserRole,
    User,
    Adress,
    Category,
    Order,
    Wishlist
};