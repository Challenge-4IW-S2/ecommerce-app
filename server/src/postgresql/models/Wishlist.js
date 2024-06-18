import { Model, DataTypes } from "sequelize";

export default function (connection) {
    class Wishlist extends Model {}

    Wishlist.init(
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
            list: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
                defaultValue: []
            },
        },
        {
            sequelize: connection,
            tableName: "wishlists",
            underscored: true,
        }
    );

    return Wishlist;
}