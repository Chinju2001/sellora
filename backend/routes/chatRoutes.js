import express from "express";

import {
    createConversation,
    getConversation,
    getMessages,
    sendMessage,
    getConversations,
} from "../controllers/chatController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   CONVERSATIONS
========================= */

// Create / get conversation
router.post(
    "/conversations",
    authMiddleware,
    createConversation
);

// Get all my conversations
router.get(
    "/conversations",
    authMiddleware,
    getConversations
);

// Get single conversation
router.get(
    "/conversations/:conversationId",
    authMiddleware,
    getConversation
);


/* =========================
   MESSAGES
========================= */

// Get messages
router.get(
    "/conversations/:conversationId/messages",
    authMiddleware,
    getMessages
);

// Send message
router.post(
    "/messages",
    authMiddleware,
    sendMessage
);

export default router;