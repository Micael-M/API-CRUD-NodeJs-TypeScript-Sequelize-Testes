import { Router, Request, Response } from 'express';
import loginService from '../service/loginService';
import loginValidate from '../utils/middlewares/loginValidate';

const loginController = Router();

loginController.post(
  '/',
  loginValidate.validateLogin,
  async (req: Request, res: Response) => {
    const credentials = req.body;
    console.log(credentials);
    const resultLogin = await loginService.login(credentials);
    if (resultLogin === undefined) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    return res.status(200).json(resultLogin);
  },
);

loginController.get(
  '/validate',
  async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const resultRole = await loginService.getRole(authorization);
    return res.status(200).json(resultRole);
  },
);

export default loginController;
