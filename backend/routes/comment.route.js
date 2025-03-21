import express from 'express';
import {
  getPostsComment,
  addComment,
} from '../controllers/comment.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/:postId', getPostsComment);
router.post('/', verifyToken, addComment);

export default router;
