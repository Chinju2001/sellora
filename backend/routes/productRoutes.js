import express from "express";

import {
    addProduct,
    getProducts,
    getProductById,
    deleteProduct,
    getMyProducts,
    updateProduct,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =========================
   PUBLIC ROUTES
========================= */

router.get("/", getProducts);

router.get(
    "/my-products",
    authMiddleware,
    getMyProducts
);

router.get(
    "/:id",
    getProductById
);


/* =========================
   PROTECTED ROUTES
========================= */

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    addProduct
);

router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    deleteProduct
);

export default router;