import User from "../models/User.js";

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        if (!user.isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Admin access required.",
            });
        }

        req.admin = user;

        next();

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default adminMiddleware;