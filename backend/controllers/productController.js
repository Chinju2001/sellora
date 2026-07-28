import Product from "../models/Product.js";

// Add Product
export const addProduct = async (req, res) => {
    try {
        const product = await Product.create({
            ...req.body,
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

// Get All Products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

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

// Get Single Product
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

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



export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({
            seller: req.user.id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this product",
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        if (product.seller.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Not authorized",
            });
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
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
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};