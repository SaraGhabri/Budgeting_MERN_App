import express from "express";
import {
  createExpense,
  getExpenses,
  getExpensesByBudget,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";
import protect from "../middleware/authMiddleware.js";
import {
  validateCreateExpense,
  validateUpdateExpense,
  validateExpenseId,
  validateBudgetIdParam,
} from "../validators/expenseValidator.js";

const router = express.Router();

router.post("/", protect, validateCreateExpense, createExpense);
router.get("/", protect, getExpenses);
router.get("/budget/:budgetId", protect, validateBudgetIdParam, getExpensesByBudget);
router.put("/:id", protect, validateUpdateExpense, updateExpense);
router.delete("/:id", protect, validateExpenseId, deleteExpense);

export default router;