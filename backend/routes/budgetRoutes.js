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
  validateCreateBudget,
  validateUpdateBudget,
  validateBudgetId,
} from "../validators/budgetValidator.js";

const router = express.Router();

router.post("/", protect, validateCreateBudget, createBudget);
router.get("/", protect, getBudgets);
router.get("/:id", protect, validateBudgetId, getBudgetById);
router.put("/:id", protect, validateUpdateBudget, updateBudget);
router.delete("/:id", protect, validateBudgetId, deleteBudget);

export default router;