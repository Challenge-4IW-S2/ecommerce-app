'use strict';
import { Model, DataTypes } from "sequelize";
import {
  denormalizePreferenceCreate,
  denormalizePreferenceDelete,
  denormalizePreferenceUpdate
} from "../../denormalizations/preference.js";

export default function (connection) {
  class Preference extends Model {
    static associate(models) {
      Preference.belongsTo(models.User,{foreignKey: 'user_id', as: 'user' });
      //Preference.belongsTo(models.PreferencesList);
    }
  }

  Preference.init({

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    activated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize:connection,
    tableName: 'preferences',
    underscored: true,
    timestamps: true
  });

  Preference.afterCreate(async (order) => {
    await denormalizePreferenceCreate(order);
  });

  Preference.afterUpdate(async (order) => {
    await denormalizePreferenceUpdate(order);
  });

  Preference.beforeDestroy(async (order) => {
    await denormalizePreferenceDelete(order);
  });

  return Preference;
};