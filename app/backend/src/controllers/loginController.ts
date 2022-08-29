import { Router, Request, Response } from 'express';
import loginService from '../service/loginService';

const loginController = Router();

loginController.post('/', async (req: Request, res: Response) => {
  const credentials = req.body;
  const resultLogin = await loginService.login(credentials);
  return res.status(200).json(resultLogin);
});

export default loginController;
