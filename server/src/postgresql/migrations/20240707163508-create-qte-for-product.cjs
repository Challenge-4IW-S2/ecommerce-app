'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'quantity', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    });
    await queryInterface.addColumn('products', 'low_stock_threshold', { // Removed the space after 'low_stock_threshold'
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10
    });
},
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
