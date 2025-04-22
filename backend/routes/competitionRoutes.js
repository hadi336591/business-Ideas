import express from 'express';
import { getAllCompetitions, createCompetition } from '../controllers/competitionController.js';
import { requireAuth, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', requireAuth, isAdmin, createCompetition);
router.get('/', getAllCompetitions);

export default router;
