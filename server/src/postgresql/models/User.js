import { Model, DataTypes } from "sequelize";
import {
    denormalizeUserCreate,
    denormalizeUserDelete,
    denormalizeUserUpdate
} from "../../denormalizations/user.js";
import bcrypt from 'bcryptjs';

export default function (connection) {

    class User extends Model {
        static associate(models) {
            User.hasMany(models.Preference,{ foreignKey: 'user_id', as: 'preferences' });
            User.hasMany(models.Wishlist, { foreignKey: 'user_id' });
        }
    }

    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
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
                allowNull: true,
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
            },
            password_updated_at: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize: connection,
            tableName: "users",
            underscored: true,
            timestamps: true
        }
    );

     User.addHook("beforeCreate", async function (user) {
        const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
        user.password = hash;
    });

    User.afterCreate(async (user) => {
        await denormalizeUserCreate(user);
    });

    User.afterUpdate(async (user) => {
        await denormalizeUserUpdate(user);
    })

    User.beforeDestroy(async (user) => {
        await denormalizeUserDelete(user);
    });

    User.addHook("beforeUpdate", async function (user, { fields }) {
        if (fields.includes("password")) {
            const hash = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
            user.password = hash;
        }
    });


    User.afterValidate(async (user) => {
        if (user.changed("lastname")) {
            user.lastname = user.lastname.toUpperCase();
        }

        if (user.changed("firstname")) {
            // UCWORDS
            user.firstname = user.firstname
                .toLowerCase()
                .replace(/(?<= )[^\s]|^./g, a=> a.toUpperCase())
        }
    });
    return User;
}