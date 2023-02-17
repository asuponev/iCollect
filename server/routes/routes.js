import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { getUser, getAllUsers, updateSelectUsers } from '../controllers/users.js';
import { createCollection, getAllCollectionsUser, updateCollection, getOneCollection } from '../controllers/collections.js';
import { createItem, getAllCollectionItems, getItem, updateItem } from '../controllers/items.js';
import { createComment, getAllItemComment } from '../controllers/comments.js';
import { addLike, getAllItemLikes, removeLike } from '../controllers/likes.js';
import { registerValidation, loginValidation, collectionValidation, itemValidation } from '../middlewares/validations.js';
import { handleValidationsErrors } from '../middlewares/handleValidationsErrors.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';

const router = new Router();

router.post('/auth/register', registerValidation, handleValidationsErrors, register);
router.post('/auth/login', loginValidation, handleValidationsErrors, login);
router.get('/auth/me', checkAuth, getMe);

router.get('/users/:id', checkAuth, getUser);
router.get('/users', checkAuth, checkAdmin, getAllUsers);
router.patch('/users', checkAuth, checkAdmin, updateSelectUsers);

router.get('/users/:id/collections', checkAuth, getAllCollectionsUser);
router.post('/collections', checkAuth, collectionValidation, handleValidationsErrors, createCollection);
router.get('/collections/:id', getOneCollection);
router.patch('/collections/:id', checkAuth, collectionValidation, handleValidationsErrors, updateCollection);

router.post('/collections/:id', checkAuth, itemValidation, handleValidationsErrors, createItem);
router.get('/collections/:id/items', getAllCollectionItems);
router.get('/collections/:collectionId/items/:itemId', getItem);
router.patch('/collections/:collectionId/items/:itemId', checkAuth, itemValidation, handleValidationsErrors, updateItem);

router.post('/comments', checkAuth, createComment);
router.get('/comments/:itemId', checkAuth, getAllItemComment);

router.post('/likes', checkAuth, addLike);
router.get('/likes/:itemId', checkAuth, getAllItemLikes);
router.delete('/likes/:itemId', checkAuth, removeLike);

export default router;
