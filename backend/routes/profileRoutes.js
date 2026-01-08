import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/profileController.js";
import protect from "../middleware/authMiddleware.js";
import {
  validateCreateProfile,
  validateUpdateProfile,
} from "../validators/profileValidator.js";

const router = express.Router();

router.post("/", protect, validateCreateProfile, createProfile);
router.get("/", protect, getProfile);
router.put("/", protect, validateUpdateProfile, updateProfile);
router.delete("/", protect, deleteProfile);

export default router;