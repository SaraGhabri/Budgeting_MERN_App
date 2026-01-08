import Profile from "../models/Profile.js";

// CREATE Profile
export const createProfile = async (req, res) => {
  try {
    // Vérifier si un profil existe déjà pour cet utilisateur
    const existingProfile = await Profile.findOne({ user: req.user._id });
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists for this user" });
    }

    const profile = await Profile.create({
      user: req.user._id,
      ...req.body,
    });
    
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Profile
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // Mise à jour des champs
    profile.monthlyIncome = req.body.monthlyIncome || profile.monthlyIncome;
    profile.financialGoal = req.body.financialGoal || profile.financialGoal;

    const updatedProfile = await profile.save();
    
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Profile
export const deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndDelete({ user: req.user._id });
    
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    
    res.json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};