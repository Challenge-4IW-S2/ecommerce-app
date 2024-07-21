import { Model, DataTypes } from "sequelize";
import {
    denormalizeUserRoleCreate,
    denormalizeUserRoleDelete,
    denormalizeUserRoleUpdate
} from "../../denormalizations/userrole.js";

export default function (connection) {
  class UserRole extends Model {}

  UserRole.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: { 
            type: DataTypes.STRING(45), 
            allowNull: true,
            unique: true,
        },
    },
    {
        sequelize: connection,
        tableName: "user_roles",
        underscored: true,
        timestamps: true
    }
  );

  UserRole.afterCreate(async (userRole) => {
      await denormalizeUserRoleCreate(userRole);
  });

  UserRole.afterUpdate(async (userRole) => {
      await denormalizeUserRoleUpdate(userRole);
  });

  UserRole.afterDestroy(async (userRole) => {
        await denormalizeUserRoleDelete(userRole.id);
    });

  return UserRole;
};
