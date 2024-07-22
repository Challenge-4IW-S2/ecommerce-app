'use strict';

const { query } = require("express");
import('../../mongo/mongodb.js');

module.exports = {
  async up (queryInterface, Sequelize) {
    const { default: PreferenceRepository } = await import("../repository/PreferenceRepository.js");
    const preferenceRepository = new PreferenceRepository();
    const { denormalizePreferenceCreate } = await import("../../denormalizations/preference.js");

    const preferences = [
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
    ];

    // Insert preferences into the database
    await queryInterface.bulkInsert('preferences_list', preferences, {});

    const allPreferences = await preferenceRepository.findAll();
    for (const preference of allPreferences) {
        await denormalizePreferenceCreate(preference);
    }
  },

  async down (queryInterface, Sequelize) {
    const { default: PreferenceRepository } = await import("../repository/PreferenceRepository.js");
    const preferenceRepository = new PreferenceRepository();
    const { denormalizePreferenceDelete } = await import("../../denormalizations/preference.js");

    const allPreferences = await preferenceRepository.findAll();
    for (const preference of allPreferences) {
        await denormalizePreferenceDelete(preference);
    }

    // Remove inserted preferences from the database
    await queryInterface.bulkDelete('preferences_list', null, {});
  }
};