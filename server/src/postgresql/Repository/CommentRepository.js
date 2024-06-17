import db from '../db.js';
import CommentModel from '../models/Comment.js';
import { v4 as uuidv4 } from 'uuid';

export default class CommentRepository {
    constructor() {
        this.Comment = CommentModel(db.connection);
    }

    async findAll() {
        return await this.Comment.findAll();
    }

    async findById(id) {
        return await this.Comment.findByPk(id);
    }

    async findByOtherField(field, value) {
        return await this.Comment.findOne({
            where: {
                [field]: value
            }
        });
    }

    async createComment(comment) {
        return await this.Comment.create({
            id: uuidv4(),
            comment: comment.comment,
            rating: comment.rating,
            is_active: comment.is_active,
            user_id: comment.user_id,
            product_id: comment.product_id
        });
    }

    async updateComment(id, comment) {
        return await this.Comment.update(comment, {
            where: {
                id: id
            }
        });
    }

    async deleteComment(id) {
        return await this.Comment.destroy({
            where: {
                id: id
            }
        });
    }
}