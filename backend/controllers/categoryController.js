import Category from "../models/Category.js";

// CREATE Category
export const createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      users: [req.user._id],
    });

    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Categories for user
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      users: req.user._id,
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
