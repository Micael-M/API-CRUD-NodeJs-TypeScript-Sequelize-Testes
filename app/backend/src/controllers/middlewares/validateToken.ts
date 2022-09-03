import { Request, Response, NextFunction } from 'express';

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.body;
  if (!authorization) res.status(401).json({ message: 'Token not found' });
  next();
};

export default {
  checkToken,
};
