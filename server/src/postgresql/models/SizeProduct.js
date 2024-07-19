import { Model, DataTypes } from "sequelize";
import { denormalizeSizeProduct, denormalizeSizeProductDelete } from "../../denormalizations/sizeproduct.js"

export default function (connection) {

    class SizeProduct extends Model {}

    SizeProduct.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            product_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'products',
                    key: 'id'
                }
            },
            size_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'sizes',
                    key: 'id'
                }
            }
        },
        {
            sequelize: connection,
            tableName: "size_products",
            underscored: true,
            timestamps: true
        }
    );

    SizeProduct.afterCreate(async (sizeProduct) => {
        await denormalizeSizeProduct(sizeProduct)
    });

    SizeProduct.afterUpdate(async (sizeProduct) => {
        await denormalizeSizeProduct(sizeProduct)
    });

    SizeProduct.beforeDestroy(async (sizeProduct) => {
        await denormalizeSizeProductDelete(sizeProduct)
    });
    return SizeProduct;
}