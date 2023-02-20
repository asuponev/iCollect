import { body } from 'express-validator';

export const registerValidation = [
  body('firstName', 'Incorrect first name').isLength({ min: 2, max: 30 }),
  body('lastName', 'Incorrect last name').isLength({ min: 2, max: 30 }),
  body('email', 'Incorrect email format').isLength({ max: 50 }).isEmail(),
  body('password', 'Min length is 5').isLength({ min: 5 }),
];

export const loginValidation = [
  body('email', 'Incorrect email format').isLength({ max: 50 }).isEmail(),
  body('password', 'Min length is 5').isLength({ min: 5 }),
];

export const collectionValidation = [
  body('title', 'Enter collection title').isLength({ min: 2, max: 30 }),
  body('description', 'Enter collection description').isLength({ min: 5 }),
  body('subject', 'Select collection subject').isLength({ min: 1 }),
  body('coverUrl', 'Incorrect image link').optional().isString(),
]

export const itemValidation = [
  body('title', 'Enter collection title').isLength({ min: 2, max: 30 }),
  body('tags', 'Enter tags').isLength({ min: 1 }),
]
