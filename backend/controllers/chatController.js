import Conversation from "../models/Conversation.js";
import Product from "../models/Product.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

/* =========================
   CREATE / GET CONVERSATION
========================= */

export const createConversation = async (req, res) => {
    try {
        const { productId } = req.body;
        const buyerId = req.user.id;

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        // Make sure product has a seller
        if (!product.seller) {
            return res.status(400).json({
                success: false,
                message: "This product does not have a seller.",
            });
        }

        // Find the actual seller account
        const seller = await User.findById(product.seller);

        if (!seller) {
            return res.status(400).json({
                success: false,
                message: "The seller account for this product does not exist.",
            });
        }

        const sellerId = seller._id.toString();

        // Seller cannot contact themselves
        if (sellerId === buyerId) {
            return res.status(400).json({
                success: false,
                message: "You cannot contact yourself.",
            });
        }

        // Check existing conversation
        let conversation = await Conversation.findOne({
            product: productId,
            participants: {
                $all: [buyerId, sellerId],
            },
        });

        // Create conversation if it doesn't exist
        if (!conversation) {
            conversation = await Conversation.create({
                product: productId,
                participants: [
                    buyerId,
                    sellerId,
                ],
            });
        }

        // Get complete conversation details
        conversation = await Conversation.findById(
            conversation._id
        )
            .populate(
                "participants",
                "name email"
            )
            .populate(
                "product",
                "name price image"
            );

        res.status(200).json({
            success: true,
            conversation,
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
   GET SINGLE CONVERSATION
========================= */

export const getConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversation =
            await Conversation.findById(
                conversationId
            )
                .populate(
                    "participants",
                    "name email"
                )
                .populate(
                    "product",
                    "name price image"
                );

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        // Check whether current user is a participant
        const isParticipant =
            conversation.participants.some(
                (participant) =>
                    participant._id.toString() ===
                    req.user.id
            );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not part of this conversation.",
            });
        }

        res.status(200).json({
            success: true,
            conversation,
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
   GET MESSAGES
========================= */

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;

        const conversation =
            await Conversation.findById(
                conversationId
            );

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        // Check participant
        const isParticipant =
            conversation.participants.some(
                (participant) =>
                    participant.toString() ===
                    req.user.id
            );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not part of this conversation.",
            });
        }

        const messages =
            await Message.find({
                conversation: conversationId,
            })
                .sort({
                    createdAt: 1,
                });

        res.status(200).json({
            success: true,
            messages,
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
   SEND MESSAGE
========================= */

export const sendMessage = async (req, res) => {
    try {
        const {
            conversationId,
            text,
        } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "Message cannot be empty.",
            });
        }

        const conversation =
            await Conversation.findById(
                conversationId
            );

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message:
                    "Conversation not found.",
            });
        }

        // Check participant
        const isParticipant =
            conversation.participants.some(
                (participant) =>
                    participant.toString() ===
                    req.user.id
            );

        if (!isParticipant) {
            return res.status(403).json({
                success: false,
                message:
                    "You are not part of this conversation.",
            });
        }

        // Find receiver
        const receiver =
            conversation.participants.find(
                (participant) =>
                    participant.toString() !==
                    req.user.id
            );

        const message =
            await Message.create({
                conversation:
                    conversationId,

                sender:
                    req.user.id,

                receiver:

                    receiver,

                text:
                    text.trim(),
            });

        res.status(201).json({
            success: true,
            message,
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
   GET MY CONVERSATIONS
========================= */

export const getConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({
            participants: userId,
        })
            .populate("participants", "name email")
            .populate("product", "name price image")
            .sort({ updatedAt: -1 });

        res.status(200).json({
            success: true,
            conversations,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};