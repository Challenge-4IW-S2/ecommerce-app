import WishlistModel from '../models/Wishlist.js';

export default class WishlistRepository {
    constructor() {
        this.Wishlist = WishlistModel;
    }

    async createOrUpdateWishlist(wishlist) {
        return this.Wishlist.findByIdAndUpdate(wishlist.id, {
            user_id: wishlist.user_id,
            product_id: wishlist.product_id,
        }, {
            upsert: true,
            new: true,
        });
    }

    async deleteWishlist(wishlistId) {
        return this.Wishlist.findByIdAndDelete(wishlistId);
    }
}