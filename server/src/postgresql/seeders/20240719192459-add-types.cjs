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
    await queryInterface.bulkInsert('types',[
      {
        name: 'Lisse',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Kinky',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Yaki',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bouclé',
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
    await queryInterface.bulkDelete('types', null, {});
  }
};
