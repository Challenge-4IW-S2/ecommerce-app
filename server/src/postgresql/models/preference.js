'use strict';
import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class Preference extends Model {
    static associate(models) {
      Preference.belongsTo(models.User);
      Preference.belongsTo(models.PreferencesList);
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
  return Preference;
};