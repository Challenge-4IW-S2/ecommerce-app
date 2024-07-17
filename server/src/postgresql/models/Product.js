import { Model, DataTypes } from "sequelize";
// const denormalizeProduct = require("../../denormalizations/product.js");

export default function (connection) {

    class Product extends Model {
        static addHooks(models) {
            Product.addHook("afterCreate", (product) => {
                denormalizeProduct(product.id);
            });

            Product.addHook("afterUpdate", (product, { fields }) => {
                if (fields.includes("name", "description", "price_ht", "price_ttc", "is_active", "slug", "category_id")) {
                    denormalizeProduct(product.id);
                }
            });
        }
    }

    Product.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            price_ht: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            price_ttc: {
                type: DataTypes.DECIMAL,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            category_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'categories',
                    key: 'id'
                }
            }
        },
        {
            sequelize: connection,
            tableName: "products",
            underscored: true,
            timestamps: true
        }
    );

    return Product;
}