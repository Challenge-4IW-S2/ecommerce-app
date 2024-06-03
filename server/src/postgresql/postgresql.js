import db from './db.js';
import UserRoleModel from "./model/UserRole.js";
import UserModel from "./model/User.js";
import AdressModel from "./model/Adress.js";
import CategoryModel from "./model/Category.js";
import OrderModel from "./model/Orders.js";
import WishlistModel from "./model/Wishlist.js";
import { v4 as uuidv4 } from "uuid";

const UserRole = UserRoleModel(db.connection);
const User = UserModel(db.connection);
const Adress = AdressModel(db.connection);
const Category = CategoryModel(db.connection);
const Order = OrderModel(db.connection);
const Wishlist = WishlistModel(db.connection);

const userRoles = ['ROLE_ADMIN', 'ROLE_STORE_KEEPER', 'ROLE_COMPTA', 'ROLE_USER'];
const categories = ['Tapes-in', 'Tissages', 'Extension à clip', 'Cosmétiques'];

async function init() {
    await UserRole.sync({ force: false }).then(async () => {
        console.log("Table user_role created");
        const count = await UserRole.count();
        if (count === 0) {
            userRoles.forEach(async (role) => {
                await UserRole.create({
                    id: uuidv4(),
                    name: role
                }).then(() => {
                    console.log(`Role ${role} created`);
                }).catch((err) => {
                    console.log(`Error creating role ${role}: ${err}`);
                });
            });
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
    const count = await Category.count();
    if (count === 0) {
        categories.forEach(async (category) => {
            await Category.create({
                id: uuidv4(),
                name: category
            }).then(() => {
                console.log(`Category ${category} created`);
            }).catch((err) => {
                console.log(`Error creating role ${category}: ${err}`);
            });
        });
    }
});
}

init();

// import UserRoleRepository from "./Repository/UserRoleRepository.js";
// const userRoleRepository = new UserRoleRepository();
// userRoleRepository.createUserRole("ROLE_TEST");
// userRoleRepository.deleteUserRole("e16b1ca0-a8e3-4179-a45b-9e4e8259c294");

// import UserRepository from "./Repository/UserRepository.js";
// const userRepository = new UserRepository();
// userRepository.createUser({
//     email: "test@test.com",
//     password: "Test1234",
//     firstname: "Test",
//     lastname: "Test",
//     phone: "0606060606",
//     role: "ROLE_ADMIN"
// });
// userRepository.updateUser("0fd554d4-5a1a-4a46-a767-aae04ffd4771", {
//     email: "test1@test.com",
// })
// userRepository.deleteUser("0fd554d4-5a1a-4a46-a767-aae04ffd4771");

export default {
    connection: db.connection,
    UserRole,
    User,
    Adress,
    Category,
    Order,
    Wishlist
};