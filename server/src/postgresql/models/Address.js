import { Model, DataTypes } from "sequelize";

export default function (connection) {
    class Address extends Model {}

    Address.init(
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
            street: {
                type: DataTypes.STRING,
                allowNull: true
            },
            city: {
                type: DataTypes.STRING,
                allowNull: true
            },
            postal_code: {
                type: DataTypes.STRING,
                allowNull: true
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true
            },
        },
        {
            sequelize: connection,
            tableName: "adresses",
        }
    );

    return Address;
}