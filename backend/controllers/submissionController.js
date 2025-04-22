import Submission from '../models/Submission.js';
import Competition from '../models/Competition.js';

export const createSubmission = async (req, res) => {
  try {
    const { competitionId, ideaTitle, ideaDescription } = req.body;

    const competition = await Competition.findById(competitionId);
    if (!competition) return res.status(404).json({ message: 'Competition not found' });

    const submission = await Submission.create({
      user: req.user._id,
      competition: competitionId,
      ideaTitle,
      ideaDescription,
      paid: true
    });

    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ message: 'Submission failed' });
  }
};

export const getUserSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ user: req.user._id }).populate('competition');
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Could not fetch submissions' });
  }
};
