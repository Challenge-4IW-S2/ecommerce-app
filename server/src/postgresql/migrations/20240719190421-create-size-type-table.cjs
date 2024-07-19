'use strict';

const {DataTypes} = require("sequelize");
const { v4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Model : Type 
    await queryInterface.createTable('types', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('gen_random_uuid')
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: true
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
    })

    // Model : Size
    await queryInterface.createTable('sizes', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('gen_random_uuid')
      },
      name: {
        type: DataTypes.INTEGER,
        allowNull: true
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
    })

    // Model: SizeProduct
    await queryInterface.createTable('size_products', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('gen_random_uuid')
      },
      product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        references: {
          model: 'products',
          key: 'id'
        }
      },
      size_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.fn('gen_random_uuid'),
        references: {
          model: 'sizes',
          key: 'id'
        }
      }
    })

    // Add new column to products
    await queryInterface.addColumn('products', 'type_id', {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'types',
          key: 'id'
        }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('products', 'type_id');
    await queryInterface.dropTable('sizes', { cascade: true });
    await queryInterface.dropTable('types', { cascade: true });
  }
};
