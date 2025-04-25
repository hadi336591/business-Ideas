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
  getAllPayments,
} from "../controllers/adminController.js";
import { isAdmin, requireAuth } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/submissions", requireAuth, isAdmin, getAllSubmissions);
router.put("/submission-status", requireAuth, isAdmin, updateSubmissionStatus);

router.get("/submissions/:competitionId", requireAuth, isAdmin, getSubmissionsByCompetition);
router.post("/submissions/:submissionId/feedback", requireAuth, isAdmin, leaveFeedback);
router.post("/submissions/:submissionId/winner", requireAuth, isAdmin, markWinner);

router.post("/competitions", requireAuth, isAdmin, createCompetition);
router.put("/competitions/:id", requireAuth, isAdmin, updateCompetition);
router.delete("/competitions/:id", requireAuth, isAdmin, deleteCompetition);
router.get("/competitions", requireAuth, isAdmin, getAllCompetitions);

router.get("/payments", requireAuth, isAdmin, getAllPayments);

export default router;
