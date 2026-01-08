import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import protect from "../middleware/authMiddleware.js";
import { 
  validateCreateCategory,
  validateUpdateCategory,
  validateCategoryId 
} from "../validators/categoryValidator.js";

const router = express.Router();

router.post("/", protect, validateCreateCategory, createCategory);
router.get("/", protect, getCategories);
router.put("/:id", protect, validateUpdateCategory, updateCategory);
router.delete("/:id", protect, validateCategoryId, deleteCategory);

export default router;