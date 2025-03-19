import express from 'express';
import { test } from '../controllers/user.controller.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

export default router;
