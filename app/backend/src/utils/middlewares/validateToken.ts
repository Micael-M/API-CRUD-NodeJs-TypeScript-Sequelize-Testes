import { Request, Response, NextFunction } from 'express';

const checkToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) res.status(401).json({ message: 'Token not found' });
  next();
};

export default {
  checkToken,
};
