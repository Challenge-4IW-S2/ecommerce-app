'use strict';
const {DataTypes} = require("sequelize");

  /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stock_event', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.fn('gen_random_uuid')
      },
      product_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "products",
          key: 'id',
        },
      },
      // event_type: 'stock_in' | 'stock_out'
      event_type: {
        type: DataTypes.ENUM('low_stock', 'restock', 'stock_out'),
        allowNull: false,
      },
      stock_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StockEvents');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_StockEvents_event_type";');
  }
};