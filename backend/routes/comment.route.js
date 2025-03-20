import express from 'express';
import { getPostsComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.get('/:postId', getPostsComment);

export default router;
