'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('preferences_list', [
      {
        name: 'RESTOCK',
        description: 'Être notifié lorsqu\'un produit est de nouveau en stock',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'PRICE',
        description: 'Être notifié lorsqu\'un produit est en promotion',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'NEW',
        description: 'Être notifié lorsqu\'un produit est ajouté',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'NEWS',
        description: 'Être notifié lorsqu\'une news est publiée',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
