'use strict';
import { Model, DataTypes } from "sequelize";
import User from "./User.js";
import PreferencesList from "./PreferencesList.js";

export default function (connection) {
  class Preference extends Model {
    static associate(models) {
      Preference.belongsTo(models.User,{foreignKey: 'user_id', as: 'user' });
      Preference.belongsTo(models.PreferencesList,{foreignKey: 'preference_id', as: 'preference' });
    }
    //ADD DENORMALIZATION
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
    preference_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'preferences_list',
        key: 'id'
      }
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


  return Preference;
};