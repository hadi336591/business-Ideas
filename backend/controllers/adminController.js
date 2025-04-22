import Submission from '../models/Submission.js';
import Competition from '../models/Competition.js';
import Submission from '../models/Submission.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/email.js';
import Payment from '../models/Payment.js';

export const getAllSubmissions = async (req, res) => {
  try {
    const subs = await Submission.find().populate('user competition');
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch submissions' });
  }
};

export const updateSubmissionStatus = async (req, res) => {
  try {
    const { submissionId, status } = req.body;
    const updated = await Submission.findByIdAndUpdate(submissionId, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update status' });
  }
};

export const createCompetition = async (req, res) => {
  const { title, description, fee, deadline, prize, rules } = req.body;

  const competition = new Competition({
    title,
    description,
    fee,
    deadline,
    prize,
    rules,
  });

  await competition.save();
  res.status(201).json({ message: 'Competition created', competition });
};

export const updateCompetition = async (req, res) => {
  const competition = await Competition.findById(req.params.id);
  if (!competition) return res.status(404).json({ error: 'Not found' });

  Object.assign(competition, req.body);
  await competition.save();

  res.json({ message: 'Competition updated', competition });
};

export const deleteCompetition = async (req, res) => {
  const competition = await Competition.findById(req.params.id);
  if (!competition) return res.status(404).json({ error: 'Not found' });

  await competition.deleteOne();
  res.json({ message: 'Competition deleted' });
};

export const getAllCompetitions = async (req, res) => {
  const competitions = await Competition.find().sort({ createdAt: -1 });
  res.json(competitions);
};


export const getSubmissionsByCompetition = async (req, res) => {
  const submissions = await Submission.find({ competition: req.params.competitionId })
    .populate('user', 'name email')
    .populate('competition', 'title');
  res.json(submissions);
};

export const leaveFeedback = async (req, res) => {
  const { feedback } = req.body;
  const submission = await Submission.findById(req.params.submissionId);
  if (!submission) return res.status(404).json({ error: 'Submission not found' });

  submission.feedback = feedback;
  await submission.save();
  res.json({ message: 'Feedback added' });
};

export const markWinner = async (req, res) => {
  const submission = await Submission.findById(req.params.submissionId)
    .populate('user')
    .populate('competition');

  if (!submission) return res.status(404).json({ error: 'Submission not found' });

  submission.isWinner = true;
  await submission.save();

  // Optional: notify user
  await sendEmail(
    submission.user.email,
    `🎉 You won the ${submission.competition.title}!`,
    `<p>Congratulations ${submission.user.name},</p>
     <p>Your idea has been selected as the winner of <strong>${submission.competition.title}</strong>!</p>
     <p>Stay tuned for prize details.</p>`
  );

  res.json({ message: 'Winner marked and notified!' });
};

export const getAllPayments = async (req, res) => {
  const payments = await Payment.find()
    .populate('user', 'name email')
    .populate('competition', 'title');
  res.json(payments);
};