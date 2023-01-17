import { body } from 'express-validator';

export const createUserValidation = [
  body('userName', 'Name should be more than 2 symbols length').isLength({
    min: 2,
  }),
  body('email', 'Please use a valid email adress').isEmail(),
  body('phone', 'Please use a valid phone number').isMobilePhone(),
  body('password', 'Password should be 8 symbols length').isLength({ min: 8 }),
];

export const loginValidation = [
  body('email', 'Please use a valid email adress').isEmail(),
  body('password', 'Password should be 8 symbols length').isLength({ min: 8 }),
];
