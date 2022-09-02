import { Router, Request, Response } from 'express';
import matchService from '../service/matchService';

const matchController = Router();

matchController.get('/', async (req: Request, res: Response) => {
  const resultMatches = await matchService.getMatch();
  return res.status(200).json(resultMatches);
});

export default matchController;
