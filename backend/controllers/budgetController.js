import Budget from "../models/Budget.js";

// CREATE Budget
export const createBudget = async (req, res) => {
  const { name, amount, startDate, endDate } = req.body;
  
  try {
    const budget = await Budget.create({
      user: req.user._id,
      name,
      amount,
      startDate,
      endDate,
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all Budgets for connected user
export const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single Budget
export const getBudgetById = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Budget
export const updateBudget = async (req, res) => {
  try {
    const budget = await Budget.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    
    // Mettre à jour les champs
    budget.name = req.body.name || budget.name;
    budget.amount = req.body.amount || budget.amount;
    budget.startDate = req.body.startDate || budget.startDate;
    budget.endDate = req.body.endDate || budget.endDate;
    
    const updatedBudget = await budget.save();
    res.json(updatedBudget);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Budget
export const deleteBudget = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    
    if (!budget) {
      return res.status(404).json({ message: "Budget not found" });
    }
    
    res.json({ message: "Budget deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};