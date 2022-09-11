import { Router, Request, Response } from 'express';
import homeService from '../service/leaderboardService';
import awayService from '../service/awayLeaderboardService';

const leaderboard = Router();

leaderboard.get('/home', async (_req: Request, res: Response) => {
  const resultLeaderBoard = await homeService.getHomeTeamTable();
  return res.status(200).json(resultLeaderBoard);
});

leaderboard.get('/away', async (_req: Request, res: Response) => {
  const resultLeaderBoard = await awayService.getAwayTeamTable();
  return res.status(200).json(resultLeaderBoard);
});

export default leaderboard;
