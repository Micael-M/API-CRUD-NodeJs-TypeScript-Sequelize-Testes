import { Router, Request, Response } from 'express';
import matchService from '../service/matchService';
import matchValidate from './middlewares/matchValidate';
import validateToken from './middlewares/validateToken';

const matchController = Router();

matchController.get('/', async (req: Request, res: Response) => {
  let getMatches = [];
  const { inProgress } = req.query;

  if (!inProgress || undefined) {
    getMatches = await matchService.getAllMatchs();
  }
  const isProgressExist = inProgress !== 'false';
  getMatches = await matchService.getMatchesFiltred(isProgressExist);
  return res.status(200).json(getMatches);
});

matchController.post(
  '/',
  validateToken.checkToken,
  matchValidate.checkDataMatch,
  async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    const dataCreateMatch = { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress };
    const restultCreateMatch = await matchService.createMatch(dataCreateMatch, authorization);
    return res.status(201).json(restultCreateMatch);
  },
);

export default matchController;