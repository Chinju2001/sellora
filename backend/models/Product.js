import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
        },

        condition: {
            type: String,
            enum: ["New", "Used"],
            required: true,
        },

        location: {
            type: String,
            required: true,
        },

        contactNumber: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;