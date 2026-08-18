import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        reportedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        reason: {
            type: String,
            required: true,
            trim: true,
        },

        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Resolved"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;