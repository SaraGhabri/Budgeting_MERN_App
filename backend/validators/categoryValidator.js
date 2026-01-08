import { body } from "express-validator";
import { handleValidationErrors } from "./authValidator.js";

export const validateCreateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Le nom de la catégorie est requis")
    .isLength({ min: 2, max: 50 })
    .withMessage("Le nom doit contenir entre 2 et 50 caractères"),
  
  handleValidationErrors,
];