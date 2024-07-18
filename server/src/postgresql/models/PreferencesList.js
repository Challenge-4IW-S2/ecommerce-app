'use strict';
import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class PreferencesList extends Model {
    static associate(models) {
      PreferencesList.hasMany(models.Preference);
  }
  }
    PreferencesList.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  }, {
      sequelize:connection,
      tableName: 'preferences_list',
      underscored: true,
      timestamps: true
  });
  return PreferencesList;
};