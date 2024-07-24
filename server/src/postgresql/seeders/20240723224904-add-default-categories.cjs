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

    for (const category of allCategories) {
      await denormalizeCategoryCreate(category);
    }
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
