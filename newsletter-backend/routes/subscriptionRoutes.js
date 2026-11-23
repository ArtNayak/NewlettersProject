import express from "express";
import { addSubscription } from "../controllers/subscriptionController.js";

const router = express.Router();

router.put("/", addSubscription);

export default router;
