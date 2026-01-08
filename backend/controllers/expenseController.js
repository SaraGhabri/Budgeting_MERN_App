import Expense from "../models/Expense.js";
import Budget from "../models/Budget.js";

// CREATE Expense
export const createExpense = async (req, res) => {
  const { amount, description, category, budget } = req.body;

  try {
    // Vérifier que le budget appartient à l'utilisateur
    const budgetExists = await Budget.findOne({
      _id: budget,
      user: req.user._id,
    });

    if (!budgetExists)
      return res.status(400).json({ message: "Invalid budget" });

    const expense = await Expense.create({
      user: req.user._id,
      amount,
      description,
      category,
      budget,
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all Expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user._id })
      .populate("category", "name")
      .populate("budget", "month totalAmount");

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Expenses by Budget
export const getExpensesByBudget = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user._id,
      budget: req.params.budgetId,
    })
      .populate("category", "name")
      .populate("budget", "month");

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Expense
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense)
      return res.status(404).json({ message: "Expense not found" });

    expense.amount = req.body.amount || expense.amount;
    expense.description = req.body.description || expense.description;
    expense.category = req.body.category || expense.category;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!expense)
      return res.status(404).json({ message: "Expense not found" });

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
