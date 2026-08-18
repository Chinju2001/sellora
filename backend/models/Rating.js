import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        ratedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
    {
        timestamps: true,
    }
);

/* One user can rate a seller once for a product */

ratingSchema.index(
    {
        seller: 1,
        ratedBy: 1,
        product: 1,
    },
    {
        unique: true,
    }
);

const Rating = mongoose.model("Rating", ratingSchema);

export default Rating;