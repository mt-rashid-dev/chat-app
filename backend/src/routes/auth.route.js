import express from "express";

import { login, logout, signup, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// POST: /api/auth/signup
router.post("/signup", signup);

// POST: /api/auth/login
router.post("/login", login);

// POST: /api/auth/logout
router.post("/logout", logout);

// PUT: /api/auth/update-profile
// router.put("/update-profile", protectRoute, updateProfile);

// GET: /api/auth/check
router.get("/check", protectRoute, checkAuth);

export default router;