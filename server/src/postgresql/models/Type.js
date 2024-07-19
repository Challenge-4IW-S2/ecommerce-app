import { Model, DataTypes } from "sequelize";
import { denormalizeType, denormalizeTypeDelete } from "../../denormalizations/type.js";

export default function (connection) {
    class Type extends Model {}

    Type.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize: connection,
            tableName: "types",
            underscored: true,
            timestamps: true
        }
    );
    Type.afterCreate(async (type) => {
        await denormalizeType(type);
    });

    Type.afterUpdate(async (type) => {
        await denormalizeTypeDelete(type.id)
    })

    return Type;
}