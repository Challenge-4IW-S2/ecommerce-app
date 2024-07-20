'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('products', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
    await queryInterface.addColumn('products', 'low_stock_threshold ', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10
    })
    } ,
  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
