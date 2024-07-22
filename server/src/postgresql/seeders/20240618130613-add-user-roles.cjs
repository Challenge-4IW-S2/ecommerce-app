'use strict';

const {query} = require("express");
import('../../mongo/mongodb.js');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const { default: UserRoleRepository } = await import("../repository/UserRoleRepository.js");
      const userRoleRepository = new UserRoleRepository();
      const { denormalizeUserRoleCreate } = await import("../../denormalizations/userrole.js");

      /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const userRoles = [
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
    ];

      await queryInterface.bulkInsert('user_roles', userRoles, {});

      const allUserRoles = await userRoleRepository.findAll();

      for (const role of allUserRoles) {
          await denormalizeUserRoleCreate(role);
      }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const { default: UserRoleRepository } = await import("../repository/UserRoleRepository.js");
    const userRoleRepository = new UserRoleRepository();
    const { denormalizeUserRoleDelete } = await import("../../denormalizations/userrole.js");


    const allUserRoles = await userRoleRepository.findAll();
    for (const role of allUserRoles) {
        await denormalizeUserRoleDelete(role);
    }

    await queryInterface.bulkDelete('user_roles', null, {});
  }
};
