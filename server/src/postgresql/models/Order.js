import { Model, DataTypes } from "sequelize";
import {
    denormalizeOrderCreate,
    denormalizeOrderUpdate
} from "../../denormalizations/order.js";

export default function (connection) {
    class Order extends Model {}

    Order.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
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
            underscored: true,
            timestamps: true
        }
    );

    Order.afterCreate(async (order) => {
        await denormalizeOrderCreate(order);
    });

    Order.afterUpdate(async (order) => {
        await denormalizeOrderUpdate(order);
    });

    return Order;
}