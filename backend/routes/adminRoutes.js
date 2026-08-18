import express from "express";

import {
    getDashboardStats,
    getUsers,
    deleteUser,
    getAllListings,
    deleteListing,
    getReports,
    updateReportStatus,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.use(
    authMiddleware,
    adminMiddleware
);

router.get(
    "/stats",
    getDashboardStats
);

router.get(
    "/users",
    getUsers
);

router.delete(
    "/users/:id",
    deleteUser
);

router.get(
    "/listings",
    getAllListings
);

router.delete(
    "/listings/:id",
    deleteListing
);

router.get(
    "/reports",
    getReports
);

router.put(
    "/reports/:id",
    updateReportStatus
);

export default router;