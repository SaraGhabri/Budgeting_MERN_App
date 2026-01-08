import express from "express";
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";
import protect from "../middleware/authMiddleware.js";
import {
  createBudgetValidation,
  updateBudgetValidation,
  budgetIdValidation,
} from "../validators/budgetValidator.js";

const router = express.Router();

router.post("/", protect, createBudgetValidation, createBudget);
router.get("/", protect, getBudgets);
router.get("/:id", protect, budgetIdValidation, getBudgetById);
router.put("/:id", protect, updateBudgetValidation, updateBudget);
router.delete("/:id", protect, budgetIdValidation, deleteBudget);

export default router;