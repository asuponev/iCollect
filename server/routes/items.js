import { Router } from 'express';
import {
  createItem,
  getAllCollectionItems,
  getItem,
  updateItem,
  deleteItem,
  deleteItems,
} from '../controllers/items.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkOwnerCollection from '../middlewares/checkOwnerCollection.js';
import { itemValidation } from '../middlewares/validations.js';
import { handleValidationsErrors } from '../middlewares/handleValidationsErrors.js';

const router = new Router();

router.post('/:collectionId/items', checkAuth, checkOwnerCollection, itemValidation, handleValidationsErrors, createItem);
router.patch('/:collectionId/items/:itemId', checkAuth, checkOwnerCollection, itemValidation, handleValidationsErrors, updateItem);
router.get('/:collectionId/items', getAllCollectionItems);
router.get('/:collectionId/items/:itemId', getItem);
router.delete('/:collectionId/items/:itemId', checkAuth, checkOwnerCollection, deleteItem);
router.delete('/:collectionId/items', checkAuth, checkOwnerCollection, deleteItems);

export default router;