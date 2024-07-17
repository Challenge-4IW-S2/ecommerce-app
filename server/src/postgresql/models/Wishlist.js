import { Model, DataTypes } from "sequelize";
import { denormalizeWishlist, denormalizeWishlistDelete } from "../../denormalizations/wishlist.js";

export default function (connection) {
    class Wishlist extends Model {}

    Wishlist.init(
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
            timestamps: true
        }
    );

    Wishlist.afterCreate(async (wishlist) => {
        await denormalizeWishlist(wishlist);
    });

    Wishlist.afterUpdate(async (wishlist) => {
        await denormalizeWishlist(wishlist);
    });

    Wishlist.beforeDestroy(async (wishlist) => {
        await denormalizeWishlistDelete(wishlist);
    });

    return Wishlist;
}