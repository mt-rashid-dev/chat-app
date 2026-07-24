import express from "express";

import { getUsersForSidebar, getMessages, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET: /api/message/users
router.get("/users", protectRoute, getUsersForSidebar);

// GET: /api/message/:id
router.get("/:id", protectRoute, getMessages);

// POST: /api/message/send/:id
router.post("/send/:id", protectRoute, sendMessage);

export default router;