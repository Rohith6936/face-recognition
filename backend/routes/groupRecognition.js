import express from 'express';
import { createGroup, getGroups } from '../controllers/groupController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Group management routes
router.post('/groups', auth, createGroup);
router.get('/groups', auth, getGroups);

export default router;
