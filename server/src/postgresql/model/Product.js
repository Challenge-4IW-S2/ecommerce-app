import { Model, DataTypes } from "sequelize";

export default function (connection) {

    class Product extends Model {}

    Product.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            name: { type: DataTypes.STRING, allowNull: false },
            description: { type: DataTypes.TEXT, allowNull: true },
            price_ht: { type: DataTypes.DECIMAL, allowNull: false },
            price_ttc: { type: DataTypes.DECIMAL, allowNull: false },
            is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
            token: { type: DataTypes.STRING, allowNull: false },
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
        }
    );

    return Product;
}