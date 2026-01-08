import express from "express";
import {
  createExpense,
  getExpenses,
  getExpensesByBudget,
  updateExpense,
  deleteExpense,
} from "../controllers/expenseController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createExpense);
router.get("/", protect, getExpenses);
router.get("/budget/:budgetId", protect, getExpensesByBudget);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

export default router;
