import { Model, DataTypes } from "sequelize";
import {
    denormalizeAddressCreate,
    denormalizeAddressDelete,
    denormalizeAddressUpdate
} from "../../denormalizations/address.js";

export default function (connection) {
    class Address extends Model {}

    Address.init(
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
            tableName: "addresses",
            underscored: true,
            timestamps: true
        }
    );

    Address.afterCreate(async (address) => {
        await denormalizeAddressCreate(address);
    });

    Address.afterUpdate(async (address) => {
        await denormalizeAddressUpdate(address);
    });

    Address.beforeDestroy(async (address) => {
        await denormalizeAddressDelete(address);
    });

    return Address;
}