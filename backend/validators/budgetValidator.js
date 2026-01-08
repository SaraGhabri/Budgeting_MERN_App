import { body, param } from "express-validator";
import { handleValidationErrors } from "./authValidator.js";

export const validateCreateBudget = [
  body("month")
    .notEmpty()
    .withMessage("Le mois est requis")
    .matches(/^\d{4}-(0[1-9]|1[0-2])$/)
    .withMessage("Format invalide. Utilisez YYYY-MM (ex: 2025-01)"),
  
  body("totalAmount")
    .notEmpty()
    .withMessage("Le montant total est requis")
    .isNumeric()
    .withMessage("Le montant doit être un nombre")
    .isFloat({ min: 0 })
    .withMessage("Le montant doit être positif"),
  
  handleValidationErrors,
];

export const validateUpdateBudget = [
  param("id")
    .isMongoId()
    .withMessage("ID invalide"),
  
  body("month")
    .optional()
    .matches(/^\d{4}-(0[1-9]|1[0-2])$/)
    .withMessage("Format invalide. Utilisez YYYY-MM"),
  
  body("totalAmount")
    .optional()
    .isNumeric()
    .withMessage("Le montant doit être un nombre")
    .isFloat({ min: 0 })
    .withMessage("Le montant doit être positif"),
  
  handleValidationErrors,
];

export const validateBudgetId = [
  param("id")
    .isMongoId()
    .withMessage("ID de budget invalide"),
  
  handleValidationErrors,
];