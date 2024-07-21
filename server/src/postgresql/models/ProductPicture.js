import { Model, DataTypes } from "sequelize";
import {
    denormalizeProductPictureCreate,
    denormalizeProductPictureDelete,
    denormalizeProductPictureUpdate
} from "../../denormalizations/productpicture.js";


export default function (connection) {

    class ProductPicture extends Model {}

    ProductPicture.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                }
            }
        },
        {
            sequelize: connection,
            tableName: "product_pictures",
            underscored: true,
            timestamps: true
        }
    );

    ProductPicture.afterCreate(async (productPicture) => {
        await denormalizeProductPictureCreate(productPicture);
    });

    ProductPicture.afterUpdate(async (productPicture) => {
        await denormalizeProductPictureUpdate(productPicture);
    });

    ProductPicture.beforeDestroy(async (productPicture) => {
        await denormalizeProductPictureDelete(productPicture);
    });

    return ProductPicture;
}