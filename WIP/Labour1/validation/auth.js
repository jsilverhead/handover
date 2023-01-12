import { body } from 'express-validator';

export const createUserValidation = [
  body('email', 'Please use a valid email adress').isEmail(),
  body('phone', 'Please use a valid phone number').isMobilePhone(),
  body('password', 'Password should be 8 symbols length').isLength({ min: 8 }),
  body('name', 'Name should be more than 2 symbols length').isLength({
    min: 2,
  }),
];

export const loginValidation = [
  body('email', 'Please use a valid email adress').isEmail(),
  body('password', 'Password should be 8 symbols length').isLength({ min: 8 }),
];
