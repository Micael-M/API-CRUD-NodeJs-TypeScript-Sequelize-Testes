import { sign, verify } from 'jsonwebtoken';

const secreteKey = process.env.JWT_SECRET || 'anything';

const createToken = (payload: string, expire = '60m') => {
  const token = sign({ payload }, secreteKey, {
    expiresIn: expire,
    algorithm: 'HS256',
  });
  return token;
};

const decodeToken = (payload: string) => {
  const resultDecode = verify(payload, secreteKey);
  return resultDecode;
};

export default {
  createToken,
  decodeToken,
};
