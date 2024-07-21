import { Model, DataTypes } from "sequelize";
import {
    denormalizeCategoryCreate,
    denormalizeCategoryDelete,
    denormalizeCategoryUpdate
} from "../../denormalizations/category.js";

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

  Category.afterCreate(async (category) => {
      await denormalizeCategoryCreate(category);
  });

  Category.afterUpdate(async (category) => {
      await denormalizeCategoryUpdate(category);
  });

  Category.afterDestroy(async (category) => {
      await denormalizeCategoryDelete(category);
  });

  return Category;
};
