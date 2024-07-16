import CommentRepository from "../postgresql/Repository/CommentRepository.js";

export class CommentController {
    static async getAllComments(req, res) {
        try {
            const commentRepository = new CommentRepository();
            const comments = await commentRepository.findAll();
            res.status(200).json(comments);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async createComment(req, res) {
        try {
            const commentRepository = new CommentRepository();
            const comment = await commentRepository.createComment(req.body);
            res.status(201).json(comment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async getComment(req, res) {
        try {
            const comment = await Comment.findByPk(req.params.id);
            res.status(200).json(comment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async updateComment(req, res) {
        try {
            const comment = await Comment.findByPk(req.params.id);
            await comment.update(req.body);
            res.status(200).json(comment);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    static async deleteComment(req, res) {
        try {
            const comment = await Comment.findByPk(req.params.id);
            await comment.destroy();
            res.status(204).end();
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}