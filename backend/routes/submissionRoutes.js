import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { createSubmission, getUserSubmissions } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/', requireAuth, createSubmission);
router.get('/my-submissions', requireAuth, getUserSubmissions);

export default router;
