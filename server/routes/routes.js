import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { getUser, getAllUsers, updateSelectUsers } from '../controllers/users.js';
import { createCollection, getAllCollectionsUser, updateCollection, getOneCollection, deleteCollection, getBiggestCollections } from '../controllers/collections.js';
import { createItem, getAllCollectionItems, getItem, updateItem, deleteItem, deleteItems, getLastItems, getAllTags, getSearchItems } from '../controllers/items.js';
import { createComment, getAllItemComment } from '../controllers/comments.js';
import { addLike, getAllItemLikes, removeLike } from '../controllers/likes.js';
import { registerValidation, loginValidation, collectionValidation, itemValidation } from '../middlewares/validations.js';
import { handleValidationsErrors } from '../middlewares/handleValidationsErrors.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkAdmin from '../middlewares/checkAdmin.js';
import checkOwnerCollection from '../middlewares/checkOwnerCollection.js';

const router = new Router();

router.post('/auth/register', registerValidation, handleValidationsErrors, register);
router.post('/auth/login', loginValidation, handleValidationsErrors, login);
router.get('/auth/me', checkAuth, getMe);

router.get('/users/:userId', getUser);
router.get('/users', checkAuth, checkAdmin, getAllUsers);
router.patch('/users', checkAuth, checkAdmin, updateSelectUsers);

router.get('/users/:userId/collections', getAllCollectionsUser);
router.post('/collections', checkAuth, collectionValidation, handleValidationsErrors, createCollection);
router.get('/collections/:collectionId', getOneCollection);
router.patch('/collections/:collectionId', checkAuth, checkOwnerCollection, collectionValidation, handleValidationsErrors, updateCollection);
router.delete('/collections/:collectionId', checkAuth, checkOwnerCollection, deleteCollection);

router.post('/collections/:collectionId', checkAuth, checkOwnerCollection, itemValidation, handleValidationsErrors, createItem);
router.get('/collections/:collectionId/items', getAllCollectionItems);
router.get('/collections/:collectionId/items/:itemId', getItem);
router.patch('/collections/:collectionId/items/:itemId', checkAuth, checkOwnerCollection, itemValidation, handleValidationsErrors, updateItem);
router.delete('/collections/:collectionId/items/:itemId', checkAuth, checkOwnerCollection, deleteItem);
router.delete('/collections/:collectionId/items/', checkAuth, checkOwnerCollection, deleteItems);

router.post('/comments', checkAuth, createComment);
router.get('/comments/:itemId', checkAuth, getAllItemComment);

router.post('/likes', checkAuth, addLike);
router.get('/likes/:itemId', checkAuth, getAllItemLikes);
router.delete('/likes/:itemId', checkAuth, removeLike);

router.get('/items', getLastItems);
router.get('/collections', getBiggestCollections);

router.get('/tags', getAllTags);

router.get('/search/:value', getSearchItems);

export default router;
