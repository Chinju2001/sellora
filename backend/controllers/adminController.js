import User from "../models/User.js";
import Product from "../models/Product.js";
import Report from "../models/Report.js";

/* =========================
   DASHBOARD STATS
========================= */

export const getDashboardStats = async (req, res) => {
    try {
        const users = await User.countDocuments();

        const products = await Product.countDocuments();

        const reports = await Report.countDocuments({
            status: "Pending",
        });

        res.status(200).json({
            success: true,
            stats: {
                users,
                products,
                reports,
            },
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
   GET USERS
========================= */

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users,
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
   DELETE USER
========================= */

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (user.isAdmin) {
            return res.status(400).json({
                success: false,
                message: "Admin account cannot be deleted.",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        await Product.deleteMany({
            seller: req.params.id,
        });

        res.status(200).json({
            success: true,
            message: "User deleted successfully.",
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
   GET ALL LISTINGS
========================= */

export const getAllListings = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("seller", "name email")
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
   DELETE LISTING
========================= */

export const deleteListing = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Listing removed successfully.",
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
   GET REPORTS
========================= */

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find()
            .populate("product", "name price image")
            .populate("reportedBy", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            reports,
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
   UPDATE REPORT
========================= */

export const updateReportStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const report = await Report.findById(req.params.id);

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found.",
            });
        }

        report.status = status;

        await report.save();

        res.status(200).json({
            success: true,
            message: "Report status updated.",
            report,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};