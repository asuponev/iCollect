import { Router } from 'express';
import { addLike, getAllItemLikes, removeLike } from '../controllers/likes.js';
import { createComment, getAllItemComment } from '../controllers/comments.js';
import { getLastItems, getAllTags, getSearchItems } from '../controllers/items.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = new Router();

router.post('/likes', checkAuth, addLike);
router.get('/likes/:itemId', checkAuth, getAllItemLikes);
router.delete('/likes/:itemId', checkAuth, removeLike);

router.post('/comments', checkAuth, createComment);
router.get('/comments/:itemId', checkAuth, getAllItemComment);

router.get('/items', getLastItems);
router.get('/tags', getAllTags);
router.get('/search/:value', getSearchItems);

export default router;