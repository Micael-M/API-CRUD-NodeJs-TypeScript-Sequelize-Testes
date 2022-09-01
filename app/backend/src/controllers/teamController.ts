import { Router, Request, Response } from 'express';
import teamService from '../service/teamService';

const teamController = Router();

teamController.get('/', async (req: Request, res: Response) => {
  const resultTeams = await teamService.getTeams();
  res.status(200).json(resultTeams);
});

export default teamController;
