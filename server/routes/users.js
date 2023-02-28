import { Router } from 'express';
import { getUser, getAllUsers, updateSelectUsers } from '../controllers/users.js';
import { getAllCollectionsUser } from '../controllers/collections.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = new Router();

router.get('/:userId', getUser);
router.get('/', checkAuth, checkAdmin, getAllUsers);
router.patch('/', checkAuth, checkAdmin, updateSelectUsers);
router.get('/:userId/collections', getAllCollectionsUser);

export default router;