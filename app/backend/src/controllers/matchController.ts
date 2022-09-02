import { Router, Request, Response } from 'express';
import matchService from '../service/matchService';

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

export default matchController;
