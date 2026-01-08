import { body, param } from "express-validator";
import { handleValidationErrors } from "./authValidator.js";

export const validateCreateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom de la catégorie est requis")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La description ne peut pas dépasser 200 caractères"),
  handleValidationErrors,
];

export const validateUpdateCategory = [
  param("id")
    .isMongoId()
    .withMessage("ID de catégorie invalide"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("La description ne peut pas dépasser 200 caractères"),
  handleValidationErrors,
];

export const validateCategoryId = [
  param("id")
    .isMongoId()
    .withMessage("ID de catégorie invalide"),
  handleValidationErrors,
];