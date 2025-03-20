import express from 'express';
import { getUser } from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/:username', getUser);

export default router;
