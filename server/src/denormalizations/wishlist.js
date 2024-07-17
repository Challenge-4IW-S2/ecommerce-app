import WishlistMongo from "../mongo/repository/WishlistRepository.js";

export const denormalizeWishlist = async (wishlistId) => {
    const wishlistRepository = new WishlistMongo();
    return await wishlistRepository.createOrUpdateWishlist(wishlistId);
}

export const denormalizeWishlistDelete = async (wishlistId) => {
    const wishlistRepository = new WishlistMongo();
    return await wishlistRepository.deleteWishlist(wishlistId);
}