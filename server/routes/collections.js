import { Router } from 'express';
import {
  createCollection,
  updateCollection,
  getOneCollection,
  deleteCollection,
  getBiggestCollections
} from '../controllers/collections.js';
import checkAuth from '../middlewares/checkAuth.js';
import checkOwnerCollection from '../middlewares/checkOwnerCollection.js';
import { collectionValidation } from '../middlewares/validations.js';
import { handleValidationsErrors } from '../middlewares/handleValidationsErrors.js';

const router = new Router();

router.post('/', checkAuth, collectionValidation, handleValidationsErrors, createCollection);
router.patch('/:collectionId', checkAuth, checkOwnerCollection, collectionValidation, handleValidationsErrors, updateCollection);
router.get('/:collectionId', getOneCollection);
router.delete('/:collectionId', checkAuth, checkOwnerCollection, deleteCollection);
router.get('/', getBiggestCollections);

export default router;