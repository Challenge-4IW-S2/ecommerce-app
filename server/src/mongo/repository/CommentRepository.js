import CommentModel from '../models/Comment.js';

export default class CommentRepository {
    constructor() {
        this.Comment = CommentModel;
    }

    async createOrUpdateComment(comment) {
        return this.Comment.findByIdAndUpdate(comment.id, {
            user_id: comment.user_id,
            product_id: comment.product_id,
            content: comment.content,
            rate: comment.rate,
        }, {
            upsert: true,
            new: true,
        });
    }
}