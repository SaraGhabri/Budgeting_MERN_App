import { body, param } from 'express-validator';

export const createBudgetValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Le nom du budget est requis')
    .isLength({ min: 3, max: 100 })
    .withMessage('Le nom doit contenir entre 3 et 100 caractères'),
  
  body('amount')
    .notEmpty()
    .withMessage('Le montant est requis')
    .isFloat({ min: 0 })
    .withMessage('Le montant doit être un nombre positif'),
  
  body('startDate')
    .notEmpty()
    .withMessage('La date de début est requise')
    .isISO8601()
    .withMessage('Format de date invalide'),
  
  body('endDate')
    .notEmpty()
    .withMessage('La date de fin est requise')
    .isISO8601()
    .withMessage('Format de date invalide')
    .custom((endDate, { req }) => {
      if (new Date(endDate) <= new Date(req.body.startDate)) {
        throw new Error('La date de fin doit être après la date de début');
      }
      return true;
    }),
];

export const updateBudgetValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID de budget invalide'),
  
  body('name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Le nom doit contenir entre 3 et 100 caractères'),
  
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Le montant doit être un nombre positif'),
  
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Format de date invalide'),
  
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('Format de date invalide'),
];

export const budgetIdValidation = [
  param('id')
    .isMongoId()
    .withMessage('ID de budget invalide'),
];