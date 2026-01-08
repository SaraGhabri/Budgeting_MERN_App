import { body, param } from "express-validator";
import { handleValidationErrors } from "./authValidator.js";

export const validateCreateExpense = [
  body("amount")
    .notEmpty()
    .withMessage("Le montant est requis")
    .isNumeric()
    .withMessage("Le montant doit être un nombre")
    .isFloat({ min: 0.01 })
    .withMessage("Le montant doit être supérieur à 0"),
  
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La description ne peut pas dépasser 200 caractères"),
  
  body("category")
    .notEmpty()
    .withMessage("La catégorie est requise")
    .isMongoId()
    .withMessage("ID de catégorie invalide"),
  
  body("budget")
    .notEmpty()
    .withMessage("Le budget est requis")
    .isMongoId()
    .withMessage("ID de budget invalide"),
  
  handleValidationErrors,
];

export const validateUpdateExpense = [
  param("id")
    .isMongoId()
    .withMessage("ID invalide"),
  
  body("amount")
    .optional()
    .isNumeric()
    .withMessage("Le montant doit être un nombre")
    .isFloat({ min: 0.01 })
    .withMessage("Le montant doit être supérieur à 0"),
  
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La description ne peut pas dépasser 200 caractères"),
  
  body("category")
    .optional()
    .isMongoId()
    .withMessage("ID de catégorie invalide"),
  
  handleValidationErrors,
];

export const validateExpenseId = [
  param("id")
    .isMongoId()
    .withMessage("ID de dépense invalide"),
  
  handleValidationErrors,
];

export const validateBudgetIdParam = [
  param("budgetId")
    .isMongoId()
    .withMessage("ID de budget invalide"),
  
  handleValidationErrors,
];