import { body } from "express-validator";
import { handleValidationErrors } from "./authValidator.js";

export const validateCreateProfile = [
  body("monthlyIncome")
    .notEmpty()
    .withMessage("Le revenu mensuel est requis")
    .isNumeric()
    .withMessage("Le revenu doit être un nombre")
    .isFloat({ min: 0 })
    .withMessage("Le revenu doit être positif"),
  
  body("financialGoal")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("L'objectif financier ne peut pas dépasser 500 caractères"),
  
  handleValidationErrors,
];

export const validateUpdateProfile = [
  body("monthlyIncome")
    .optional()
    .isNumeric()
    .withMessage("Le revenu doit être un nombre")
    .isFloat({ min: 0 })
    .withMessage("Le revenu doit être positif"),
  
  body("financialGoal")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("L'objectif financier ne peut pas dépasser 500 caractères"),
  
  handleValidationErrors,
];