import Sequelize, { Model, DataTypes } from "sequelize";

export default function (connection) {
    class ResetPasswordToken extends Model {}

    ResetPasswordToken.init(
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
            token: {
                type: DataTypes.STRING(255),
                allowNull: false,
                defaultValue: DataTypes.UUIDV4
            },
            expires_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP' + ' + INTERVAL \'1 HOUR\'')
            }
        },
        {
            sequelize: connection,
            tableName: "reset_password_tokens",
            underscored: true,
            timestamps: true
        }
    );

    return ResetPasswordToken;
}