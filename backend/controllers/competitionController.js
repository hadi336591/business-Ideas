import Competition from '../models/Competition.js';

export const getAllCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find().sort({ deadline: 1 });
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch competitions' });
  }
};

export const createCompetition = async (req, res) => {
  try {
    const competition = await Competition.create(req.body);
    res.status(201).json(competition);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create competition' });
  }
};
