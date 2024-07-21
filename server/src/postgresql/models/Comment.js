import { Model, DataTypes } from "sequelize";
import {
    denormalizeCommentCreate,
    denormalizeCommentDelete,
    denormalizeCommentUpdate
} from "../../denormalizations/comment.js";

export default function (connection) {

    class Comment extends Model {}

    Comment.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4
            },
            comment: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
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
            tableName: "comments",
            underscored: true,
            timestamps: true
        }
    );

    Comment.afterCreate(async (comment) => {
        await denormalizeCommentCreate(comment);
    });

    Comment.beforeUpdate(async (comment) => {
        await denormalizeCommentUpdate(comment);
    });

    Comment.afterDestroy(async (comment) => {
        await denormalizeCommentDelete(comment);
    });

    return Comment;
}