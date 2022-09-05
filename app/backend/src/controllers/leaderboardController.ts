import { Router, Request, Response } from 'express';
import leaderboardService from '../service/leaderboardService';

const leaderboard = Router();

leaderboard.get('/home', async (req: Request, res: Response) => {
  const resultLeaderBoard = await leaderboardService.getHomeTeam();
  return res.status(200).json(resultLeaderBoard);
});

export default leaderboard;
