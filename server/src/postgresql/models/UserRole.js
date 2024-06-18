import { Model, DataTypes } from "sequelize";

export default function (connection) {
  class UserRole extends Model {}

  UserRole.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true
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
    }
  );

  return UserRole;
};
