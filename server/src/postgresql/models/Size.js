import { Model, DataTypes } from "sequelize";

export default function (connection) {
    class Size extends Model {}

    Size.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            name: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize: connection,
            tableName: "sizes",
            underscored: true,
            timestamps: true
        }
    );

    return Size;
}