import { Router, Request, Response } from 'express';
import loginService from '../service/loginService';
import loginValidate from './middlewares/loginValidate';

const loginController = Router();

loginController.post(
  '/',
  loginValidate.validateLogin,
  async (req: Request, res: Response) => {
    const credentials = req.body;
    const resultLogin = await loginService.login(credentials);
    return res.status(200).json(resultLogin);
  },
);

export default loginController;
