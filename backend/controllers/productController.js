import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";


/* =========================
   ADD PRODUCT
========================= */

export const addProduct = async (req, res) => {
    try {

        let imageUrl = "";

        /* =========================
           UPLOAD IMAGE TO CLOUDINARY
        ========================= */

        if (req.file) {

            const uploadResult =
                await new Promise((resolve, reject) => {

                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder: "sellora/products",
                            },
                            (error, result) => {

                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result);
                                }

                            }
                        );

                    stream.end(req.file.buffer);

                });

            imageUrl = uploadResult.secure_url;
        }


        /* =========================
           CREATE PRODUCT
        ========================= */

        const product = await Product.create({
            ...req.body,
            image: imageUrl,
            seller: req.user.id,
        });


        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product,
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
   GET ALL PRODUCTS
========================= */

export const getProducts = async (req, res) => {

    try {

        const products = await Product.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products,
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
   GET SINGLE PRODUCT
========================= */

export const getProductById = async (req, res) => {

    try {

        const product =
            await Product.findById(req.params.id)
                .populate(
                    "seller",
                    "name email"
                );

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }

        res.status(200).json({
            success: true,
            product,
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
   GET MY PRODUCTS
========================= */

export const getMyProducts = async (req, res) => {

    try {

        const products =
            await Product.find({
                seller: req.user.id,
            })
                .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products,
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
   DELETE PRODUCT
========================= */

export const deleteProduct = async (req, res) => {

    try {

        const product =
            await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }


        /* =========================
           CHECK SELLER
        ========================= */

        if (
            product.seller.toString() !==
            req.user.id
        ) {

            return res.status(403).json({
                success: false,
                message:
                    "You are not authorized to delete this product",
            });

        }


        await Product.findByIdAndDelete(
            req.params.id
        );


        res.status(200).json({
            success: true,
            message:
                "Product deleted successfully",
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
   UPDATE PRODUCT
========================= */

export const updateProduct = async (req, res) => {

    try {

        const product =
            await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }


        /* =========================
           CHECK SELLER
        ========================= */

        if (
            product.seller.toString() !==
            req.user.id
        ) {

            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });

        }


        /* =========================
           PRODUCT DATA
        ========================= */

        const updateData = {
            ...req.body,
        };


        /* =========================
           UPLOAD NEW IMAGE
        ========================= */

        if (req.file) {

            const uploadResult =
                await new Promise((resolve, reject) => {

                    const stream =
                        cloudinary.uploader.upload_stream(
                            {
                                folder:
                                    "sellora/products",
                            },
                            (error, result) => {

                                if (error) {
                                    reject(error);
                                } else {
                                    resolve(result);
                                }

                            }
                        );

                    stream.end(req.file.buffer);

                });

            updateData.image =
                uploadResult.secure_url;
        }


        /* =========================
           UPDATE
        ========================= */

        const updatedProduct =
            await Product.findByIdAndUpdate(
                req.params.id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                }
            );


        res.status(200).json({
            success: true,
            product: updatedProduct,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};