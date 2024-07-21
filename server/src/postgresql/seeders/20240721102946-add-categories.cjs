'use strict';

const {query} = require("express");
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
   await queryInterface.bulkInsert('categories', [
      {
        name: 'Tapes-in',
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
        name: 'Cosmétiques',
        created_at: new Date(),
        updated_at: new Date()
      },
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {});
  }
};
