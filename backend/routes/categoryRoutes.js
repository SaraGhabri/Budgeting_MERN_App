import express from "express";
import {
  createCategory,
  getCategories,
} from "../controllers/categoryController.js";
import protect from "../middleware/authMiddleware.js";
import { validateCreateCategory } from "../validators/categoryValidator.js";

const router = express.Router();

router.post("/", protect, validateCreateCategory, createCategory);
router.get("/", protect, getCategories);

export default router;