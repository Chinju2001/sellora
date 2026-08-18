import express from "express";

import {
    createRating,
    getSellerRating,
} from "../controllers/ratingController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    createRating
);

router.get(
    "/seller/:sellerId",
    getSellerRating
);

export default router;