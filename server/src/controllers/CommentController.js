import CommentRepository from "../postgresql/repository/CommentRepository.js";

export class CommentController {
    static async getAllComments(req, res,next) {
        try {
            const commentRepository = new CommentRepository();
            const comments = await commentRepository.findAll();
            res.json(comments);
        } catch (error) {
            next(error);
        }
    }
    static async createComment(req, res,next) {
        try {
            const commentRepository = new CommentRepository();
            const comment = await commentRepository.createComment(req.body);
            res.status(201).json(comment);
        } catch (error) {
            next(error);
        }
    }
    static async getComment(req, res,next) {
        try {
            const comment = await Comment.findByPk(req.params.id);
            res.json(comment);
        } catch (error) {
            next(error);
        }
    }
    static async deleteComment(req, res,next) {
        try {
            const comment = await Comment.findByPk(req.params.id);
            await comment.destroy();
            res.sendStatus(204);
        } catch (error) {
           next(error);
        }
    }
}
