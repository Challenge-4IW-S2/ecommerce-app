import { Model, DataTypes } from "sequelize";

export default function (connection) {

    class User extends Model {}

    User.init(
        {
            id: { type: DataTypes.UUID, primaryKey: true },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
                validate: {
                isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                },
            },
            firstname: {type: DataTypes.STRING, allowNull: true},
            lastname: {type: DataTypes.STRING, allowNull: true},
            phone: {type: DataTypes.STRING, allowNull: true},
            is_verified: {type: DataTypes.BOOLEAN, defaultValue: false},
            role: {
                type: DataTypes.UUID, 
                allowNull: true,
                references: {
                model: 'user_roles',
                key: 'id'
                }
            },
        },
        {
            sequelize: connection,
            tableName: "users",
        }
    );

    return User;
}