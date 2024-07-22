import { Model, DataTypes } from "sequelize";
import {
    denormalizeProductCreate,
    denormalizeProductDelete,
    denormalizeProductUpdate
} from "../../denormalizations/product.js";

export default function (connection) {
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, { foreignKey: 'category_id' });
            Product.hasMany(models.ProductPicture, { foreignKey: 'product_id' });
            Product.hasMany(models.StockEvent, { foreignKey: 'product_id' });
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
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            low_stock_threshold: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 10
            }
        },
        {
            sequelize: connection,
            tableName: "products",
            underscored: true,
            timestamps: true
        }
    );

    Product.afterCreate(async (product) => {
        await denormalizeProductCreate(product);
    });


    Product.beforeUpdate(async (product) => {
        await denormalizeProductUpdate(product);
    });

    Product.afterDestroy(async (product) => {
        await denormalizeProductDelete(product);
    });

    return Product;
}