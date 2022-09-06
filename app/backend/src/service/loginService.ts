import { compare } from 'bcryptjs';
import { ILogin } from '../interfaces/interface';
import User from '../database/models/User';
import JWT from '../utils/jwtToken';

const checkPassword = async (password: string, payload: string) => {
  const resultCheck = await compare(password, payload);
  return resultCheck;
};

const login = async (credentials: ILogin) => {
  const { email, password } = credentials;
  const resultLogin = await User.findOne({ where: { email } });
  if (resultLogin === null) {
    return undefined;
  }
  console.log(resultLogin);
  const verifyPassword = await checkPassword(password, resultLogin.password);
  if (!verifyPassword) return undefined;

  const createToken = await JWT.createToken(resultLogin.role);
  return {
    token: createToken,
  };
};

const getRole = async (authorization: any) => {
  const validateToken = await JWT.decodeToken(authorization);
  const [resultRole] = Object.values(validateToken);
  return {
    role: resultRole,
  };
};

export default {
  login,
  getRole,
};
