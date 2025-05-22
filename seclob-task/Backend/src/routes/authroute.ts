import express from 'express';
import { loginUser, registerUser } from '../controllers/authController'
import { loginValidation, registerValidation } from '../validators/authValidator'

import { validateRequest } from '../middlewares/validate';

const router = express.Router();

router.post('/register', registerValidation, validateRequest, registerUser);
router.post('/login', loginValidation, validateRequest, loginUser);


export default router;
