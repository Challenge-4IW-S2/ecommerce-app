'use strict';

const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    // Model : Category
    await queryInterface.createTable('categories', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    });

    // Model : UserRole
    await queryInterface.createTable('user_roles', {

    });

    // Model : Product
    await queryInterface.createTable('products', {

    });

    // Model : ProductPicture
    await queryInterface.createTable('product_pictures', {

    });

    // Model : User
    await queryInterface.createTable('users', {

    });

    // Model : Address
    await queryInterface.createTable('addresses', {

    });

    // Model : Comment
    await queryInterface.createTable('comments', {

    });

    // Model : Order
    await queryInterface.createTable('orders', {

    });

    // Model : Wishlist
    await queryInterface.createTable('wishlists', {

    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('wishlists');
    await queryInterface.dropTable('orders');
    await queryInterface.dropTable('comments');
    await queryInterface.dropTable('addresses');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('product_pictures');
    await queryInterface.dropTable('products');
    await queryInterface.dropTable('user_roles');
    await queryInterface.dropTable('categories');
  }
};
