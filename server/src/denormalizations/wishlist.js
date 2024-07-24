import WishlistMongo from "../mongo/repository/WishlistRepository.js";
import UserMongo from "../mongo/repository/UserRepository.js";

export const denormalizeWishlistCreate = async (wishlist) => {
    const wishlistRepository = new WishlistMongo();
    const addedWishlist = await wishlistRepository.createOrUpdateWishlist(wishlist);

    const userRepository = new UserMongo();
    return await userRepository.updateSubdocument(wishlist.dataValues.user_id, 'wishlists', addedWishlist);
}

export const denormalizeWishlistUpdate = async (wishlist) => {
    const wishlistRepository = new WishlistMongo();
    const addedWishlist = await wishlistRepository.createOrUpdateWishlist(wishlist);

    const userRepository = new UserMongo();
    if (wishlist._previousDataValues.user_id !== wishlist.dataValues.user_id) {
        await userRepository.deleteSubdocument(wishlist._previousDataValues.user_id, 'wishlists', wishlist.dataValues.id);
    }

    return await userRepository.updateSubdocument(wishlist.dataValues.user_id, 'wishlists', addedWishlist);
}

export const denormalizeWishlistDelete = async (wishlist) => {
    const wishlistRepository = new WishlistMongo();
    await wishlistRepository.deleteWishlist(wishlist.dataValues.id);

    const userRepository = new UserMongo();
    return await userRepository.deleteSubdocument(wishlist.dataValues.user_id, 'wishlists', wishlist.dataValues.id);
}