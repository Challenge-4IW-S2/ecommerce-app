import CommentMongo from "../mongo/repository/CommentRepository.js";

export const denormalizeComment = async (commentId) => {
    const commentRepository = new CommentMongo();
    return await commentRepository.createOrUpdateComment(commentId);
}