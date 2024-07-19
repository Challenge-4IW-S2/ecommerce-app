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
    await queryInterface.bulkInsert('sizes',[
      {
        name: 12,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 14,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 16,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 18,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 20,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 22,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 24,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 26,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 28,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 30,
        created_at: new Date(),
        updated_at: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('sizes', null, {});
  }
};
