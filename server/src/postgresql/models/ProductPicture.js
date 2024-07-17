import { Model, DataTypes } from "sequelize";
// const denormalizeProductPicture = require("../../denormalizations/productpicture.js");

export default function (connection) {

    class ProductPicture extends Model {
        static addHooks(models) {
            ProductPicture.addHook("afterCreate", (productPicture) => {
                denormalizeProductPicture(productPicture.id);
            });

            ProductPicture.addHook("afterUpdate", (productPicture, { fields }) => {
                if (fields.includes("url", "product_id")) {
                    denormalizeProductPicture(productPicture.id);
                }
            });
        }
    }

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

    return ProductPicture;
}