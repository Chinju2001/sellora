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

const router = express.Router();

// Public Routes
router.get("/", getProducts);
router.get("/my-products", authMiddleware, getMyProducts);
router.get("/:id", getProductById);

// Protected Routes
router.post("/", authMiddleware, addProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;