import { Model, DataTypes } from "sequelize";
import bcrypt from 'bcryptjs';
import db from '../db.js';
export default function (connection) {

    class User extends Model {}

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true
            },
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
                    is: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{12,}$/, // au moins 12 caractères, et inclut au moins une majuscule, une minuscule et un caractère spécial
                },
            },
            firstname: {
                type: DataTypes.STRING,
                allowNull: true
            },
            lastname: {
                type: DataTypes.STRING,
                allowNull: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            role: {
                type: DataTypes.UUID, 
                allowNull: true,
                references: {
                    model: 'user_roles',
                    key: 'id'
                }
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize: connection,
            tableName: "users",
            underscored: true,
            timestamps: true
        }
    );

    // Refactor la fonction des deux hooks ?
    User.addHook("beforeCreate", async function (user) {
        const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
        user.password = hash;
    });

    User.addHook("beforeUpdate", async function (user, { fields }) {
        if (fields.includes("password")) {
            const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            user.password = hash;
        }
    });
    return User;
}