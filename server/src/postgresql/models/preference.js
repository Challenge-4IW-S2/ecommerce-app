import { Model, DataTypes } from "sequelize";
import {denormalizeUser} from "../../denormalizations/user.js";

export default function (connection) {
  class Preference extends Model {
    static associate(models) {
      Preference.belongsTo(models.User);
    }
    //ADD DENORMALIZATION
    }

  Preference.init({

    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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
    modelName: 'preferences',
    underscored: true,
    timestamps: true
  });
  return Preference;
};