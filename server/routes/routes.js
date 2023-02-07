import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { getUser } from '../controllers/users.js';
import { registerValidation, loginValidation } from '../middlewares/validations.js';
import { handleValidationsErrors } from '../middlewares/handleValidationsErrors.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = new Router();

router.post('/auth/register', registerValidation, handleValidationsErrors, register);
router.post('/auth/login', loginValidation, handleValidationsErrors, login);
router.get('/auth/me', checkAuth, getMe);
router.get('/users/:id', checkAuth, getUser);

export default router;
