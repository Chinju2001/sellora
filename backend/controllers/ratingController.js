import Rating from "../models/Rating.js";
import Product from "../models/Product.js";

export const createRating = async (req, res) => {
    try {
        const { productId, rating } = req.body;

        if (!productId || !rating) {
            return res.status(400).json({
                success: false,
                message: "Product and rating are required.",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        const sellerId = product.seller.toString();

        // Seller cannot rate themselves
        if (sellerId === req.user.id) {
            return res.status(400).json({
                success: false,
                message: "You cannot rate yourself.",
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5.",
            });
        }

        const existingRating = await Rating.findOne({
            seller: sellerId,
            ratedBy: req.user.id,
            product: productId,
        });

        if (existingRating) {
            return res.status(400).json({
                success: false,
                message: "You have already rated this seller.",
            });
        }

        const newRating = await Rating.create({
            seller: sellerId,
            ratedBy: req.user.id,
            product: productId,
            rating,
        });

        res.status(201).json({
            success: true,
            message: "Seller rated successfully.",
            rating: newRating,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


/* =========================
   GET SELLER RATING
========================= */

export const getSellerRating = async (req, res) => {
    try {
        const { sellerId } = req.params;

        const ratings = await Rating.find({
            seller: sellerId,
        });

        if (ratings.length === 0) {
            return res.status(200).json({
                success: true,
                averageRating: 0,
                totalRatings: 0,
            });
        }

        const total = ratings.reduce(
            (sum, item) => sum + item.rating,
            0
        );

        const averageRating =
            total / ratings.length;

        res.status(200).json({
            success: true,
            averageRating:
                Math.round(averageRating * 10) / 10,
            totalRatings: ratings.length,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};