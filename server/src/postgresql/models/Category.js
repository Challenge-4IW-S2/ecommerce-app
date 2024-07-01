import { Model, DataTypes } from "sequelize";


export default function (connection) {
  class Category extends Model {}

  Category.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: { 
            type: DataTypes.STRING(45), 
            allowNull: true
        },
    },
    {
        sequelize: connection,
        tableName: "categories",
        underscored: true,
        timestamps: true
    }
  );

  return Category;
};
