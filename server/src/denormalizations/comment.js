import CommentMongo from "../mongo/repository/CommentRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";
import ProductMongo from "../mongo/repository/ProductRepository.js";

export const denormalizeCommentCreate = async (comment) => {
    const commentRepository = new CommentMongo();
    const addedComment = await commentRepository.createOrUpdateComment(comment);

    const productRepository = new ProductMongo();
    await productRepository.updateSubdocument(comment.dataValues.product_id, 'comments', addedComment);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(comment.dataValues.user_id, 'comments', addedComment);
}

export const denormalizeCommentUpdate = async (comment) => {
    const commentRepository = new CommentMongo();
    const addedComment = await commentRepository.createOrUpdateComment(comment);

    const productRepository = new ProductMongo();
    await productRepository.updateSubdocument(comment.dataValues.product_id, 'comments', addedComment);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(comment.dataValues.user_id, 'comments', addedComment);
}

export const denormalizeCommentDelete = async (comment) => {
    const commentRepository = new CommentMongo();
    await commentRepository.deleteComment(comment.dataValues.id);

    const productRepository = new ProductMongo();
    await productRepository.deleteSubdocument(comment.dataValues.product_id, 'comments', comment.dataValues.id);

    const userRepository = new UserMongo();
    return await userRepository.deleteSubdocument(comment.dataValues.user_id, 'comments', comment.dataValues.id);
}