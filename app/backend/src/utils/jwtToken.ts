import { sign } from 'jsonwebtoken';

const secreteKey = process.env.SECRET_KEY || 'anything';

const createToken = (payload: string, expire = '60m') => {
  const token = sign({ payload }, secreteKey, {
    expiresIn: expire,
    algorithm: 'HS256',
  });
  return token;
};

export default {
  createToken,
};
