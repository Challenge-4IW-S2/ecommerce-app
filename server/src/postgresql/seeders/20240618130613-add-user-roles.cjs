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
    await queryInterface.bulkInsert('user_roles', [
        {
            name: 'ROLE_USER',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            name: 'ROLE_ADMIN',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            name: 'ROLE_STORE_KEEPER',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            name: 'ROLE_COMPTA',
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
    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
