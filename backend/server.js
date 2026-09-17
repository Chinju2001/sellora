import "dotenv/config";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatRoutes.js";
import connectDB from "./config/db.js";
import reportRoutes from "./routes/reportRoutes.js"
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import ratingRoutes from "./routes/ratingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/reports", reportRoutes);
app.use(
    "/api/ratings",
    ratingRoutes
);
app.use("/api/admin", adminRoutes);
app.get("/", (req, res) => {
    res.send("Sellora Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});