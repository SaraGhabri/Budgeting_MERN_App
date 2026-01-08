import express from "express";
import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
} from "../controllers/budgetController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBudget);
router.get("/", protect, getBudgets);
router.get("/:id", protect, getBudgetById);
router.put("/:id", protect, updateBudget);
router.delete("/:id", protect, deleteBudget);

export default router;
