'use strict';

/** @type {import('sequelize-cli').Migration} */
import('../../mongo/mongodb.js');
module.exports = {
  async up (queryInterface, Sequelize) {
    const { default: CategoryRepository } = await import("../repository/CategoryRepository.js");
    const categoryRepository = new CategoryRepository();
    const { denormalizeCategoryCreate } = await import("../../denormalizations/category.js");
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const categories = [
      {
        name: 'Tapes-In',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Tissages',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Extension à clip',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Accessoires',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    await queryInterface.bulkInsert('categories', categories, {});
    const allCategories = await categoryRepository.findAll();
    let product = [];


    for (const category of allCategories) {
      await denormalizeCategoryCreate(category);
      product = [
        {
          name: 'Tissage Bresilien',
          description: 'Tissage Bresilien 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tissage-bresilien',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        },
        {
          name: 'Tissage Peruvien',
          description: 'Tissage Peruvien 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tissage-peruvien',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        },
        {
          name: 'Tissage Indien',
          description: 'Tissage Indien 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tissage-indien',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        },
        {
          name:'Tape-In Bresilien',
          description: 'Tape-In Bresilien 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tape-in-bresilien',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Tape-In Bresilien',
          description: 'Tape-In Bresilien 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tape-in-bresilien-deux',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Tape-In Deep Wave',
          description: 'Tape-In Deep Wave 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tape-in-deep-wave',
          category_id: category.id,
          quantity: 100,
          low_stock_threshold: 20
        }, {
          name:'Tape-In Kinky',
          description: 'Tape-In Kinky 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tape-in-Kinky',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Tape-In Curly',
          description: 'Tape-In Curly 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tape-in-curly',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Tape-In Water Wave',
          description: 'Tape-In Water Wave 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tape-in-water-waze',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Tape-In Bresilien',
          description: 'Tape-In Bresilien 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'tape-in-bresilien-trois',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Extension à clip Bresilien',
          description: 'Extension à clip Bresilien 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'extension-in-bresilien',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Extension à clip Kinky',
          description: 'Extension à clip Kinky 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'extension-in-kinky',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }, {
          name:'Extension à clip Deep Wave',
          description: 'Extension à clip Deep Wave 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'extension-in-deep-wave',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        },  {
          name:'Extension à clip Water Wave',
          description: 'Extension à clip Water Wave 100% naturel',
          price_ht: 100,
          is_active: true,
          slug: 'extension-in-water-wave',
          category_id: category.id,
          quantity: 10,
          low_stock_threshold: 2
        }];

    }
    await queryInterface.bulkInsert('products', product, {});


  },

  async down (queryInterface, Sequelize) {
    const { default: CategoryRepository } = await import("../repository/CategoryRepository.js");
    const categoryRepository = new CategoryRepository();
    const { denormalizeCategoryDelete } = await import("../../denormalizations/category.js");

    const allCategories = await categoryRepository.findAll();
    for (const category of allCategories) {
      await denormalizeCategoryDelete(category);
    }

    await queryInterface.bulkDelete('categories', null, {});
  }
};
