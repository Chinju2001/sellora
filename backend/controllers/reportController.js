import Report from "../models/Report.js";
import Product from "../models/Product.js";

export const createReport = async (req, res) => {
    try {
        console.log("REPORT REQUEST RECEIVED:", req.body);
        console.log("USER:", req.user.id);

        const { productId, reason } = req.body;

        if (!productId || !reason?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Product and reason are required.",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        const existingReport = await Report.findOne({
            product: productId,
            reportedBy: req.user.id,
            status: "Pending",
        });

        if (existingReport) {
            return res.status(400).json({
                success: false,
                message: "You have already reported this product.",
            });
        }

        const report = await Report.create({
            product: productId,
            reportedBy: req.user.id,
            reason: reason.trim(),
        });

        console.log("REPORT CREATED:", report._id);

        res.status(201).json({
            success: true,
            message: "Product reported successfully.",
            report,
        });

    } catch (error) {
        console.error("REPORT ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};