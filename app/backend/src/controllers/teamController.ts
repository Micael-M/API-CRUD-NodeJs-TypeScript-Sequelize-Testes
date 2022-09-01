import { Router, Request, Response } from 'express';
import teamService from '../service/teamService';

const teamController = Router();

teamController.get('/', async (_req: Request, res: Response) => {
  const resultTeams = await teamService.getTeams();
  return res.status(200).json(resultTeams);
});

teamController.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const resultTeamId = await teamService.getTemaById(Number(id));
  return res.status(200).json(resultTeamId);
});

export default teamController;
