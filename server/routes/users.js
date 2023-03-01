import { Router } from 'express';
import { getUser, getAllUsers, blockUser, makeAdmin, deleteUser, deleteUsers } from '../controllers/users.js';
import { getAllCollectionsUser } from '../controllers/collections.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = new Router();

router.get('/:userId', getUser);
router.get('/', checkAuth, checkAdmin, getAllUsers);
router.patch('/block/:userId', checkAuth, checkAdmin, blockUser);
router.patch('/makeadmin/:userId', checkAuth, checkAdmin, makeAdmin);
router.patch('/delete/:userId', checkAuth, checkAdmin, deleteUser);
router.patch('/delete', checkAuth, checkAdmin, deleteUsers);
router.get('/:userId/collections', getAllCollectionsUser);

export default router;