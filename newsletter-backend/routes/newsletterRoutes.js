import express from "express";
import {
  createNewsletter,
  getNewsletters,
  searchNewsletters,
  getStats,
} from "../controllers/newsletterController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Faculty: Create newsletter
router.post("/", protect, createNewsletter);

// Everyone: View all newsletters
router.get("/", getNewsletters);

// Everyone: Search newsletters
router.get("/search", searchNewsletters);

// Faculty: Get dashboard stats
router.get("/stats", protect, getStats);

export default router;
