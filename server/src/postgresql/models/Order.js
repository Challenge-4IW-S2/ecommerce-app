import { Model, DataTypes } from "sequelize";

export default function (connection) {
    class Order extends Model {}

    Order.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            total_price: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true
            },
            invoice: {
                type: DataTypes.JSON,
                allowNull: true
            },
        },
        {
            sequelize: connection,
            tableName: "orders",
        }
    );

    return Order;
}