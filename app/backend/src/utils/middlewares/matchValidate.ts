import { Request, Response, NextFunction } from 'express';
import Team from '../../database/models/Team';

const checkDataMatch = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  const getAllTeams = await Team.findAll();

  if (homeTeam === awayTeam) {
    return res.status(401).json({
      message: 'It is not possible to create a match with two equal teams' });
  }

  if (homeTeam < 1 || homeTeam > getAllTeams.length) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }

  if (awayTeam < 1 || awayTeam > getAllTeams.length) {
    return res.status(404).json({ message: 'There is no team with such id!' });
  }
  next();
};

export default {
  checkDataMatch,
};
