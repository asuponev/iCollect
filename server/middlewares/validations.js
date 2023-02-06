import { body } from 'express-validator';

export const registerValidation = [
  body('firstName', 'Incorrect first name').isLength({ min: 2, max: 50 }),
  body('lastName', 'Incorrect last name').isLength({ min: 2, max: 50 }),
  body('email', 'Incorrect email format').isLength({ max: 50 }).isEmail(),
  body('password', 'Min length is 5').isLength({ min: 5 }),
];

export const loginValidation = [
  body('email', 'Incorrect email format').isLength({ max: 50 }).isEmail(),
  body('password', 'Min length is 5').isLength({ min: 5 }),
];
