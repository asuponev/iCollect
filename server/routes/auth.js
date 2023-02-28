import { Router } from 'express';
import { register, login, getMe, firebaseLogin } from '../controllers/auth.js';
import { registerValidation, loginValidation } from '../middlewares/validations.js';
import { handleValidationsErrors } from '../middlewares/handleValidationsErrors.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = new Router();

router.post('/register', registerValidation, handleValidationsErrors, register);
router.post('/login', loginValidation, handleValidationsErrors, login);
router.post('/firebaseLogin', firebaseLogin);
router.get('/me', checkAuth, getMe);

export default router;