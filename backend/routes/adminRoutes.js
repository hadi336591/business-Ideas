import {
  getAllSubmissions,
  updateSubmissionStatus,
  getSubmissionsByCompetition,
  leaveFeedback,
  markWinner,
  createCompetition,
  updateCompetition,
  deleteCompetition,
  getAllCompetitions,
} from "../controllers/adminController.js";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/submissions", requireAuth, isAdmin, getAllSubmissions);
router.put("/submission-status", requireAuth, isAdmin, updateSubmissionStatus);

router.get("/submissions/:competitionId", isAdmin, getSubmissionsByCompetition);
router.post("/submissions/:submissionId/feedback", isAdmin, leaveFeedback);
router.post("/submissions/:submissionId/winner", isAdmin, markWinner);

router.post("/competitions", isAdmin, createCompetition);
router.put("/competitions/:id", isAdmin, updateCompetition);
router.delete("/competitions/:id", isAdmin, deleteCompetition);
router.get("/competitions", isAdmin, getAllCompetitions);

router.get('/payments', isAdmin, getAllPayments);