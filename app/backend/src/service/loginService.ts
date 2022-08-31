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
  const verifyPassword = await checkPassword(password, resultLogin.password);
  if (!verifyPassword) return { error: { message: 'Incorrect email or password' } };

  const createToken = await JWT.createToken(resultLogin.role);
  return {
    token: createToken,
  };
  // return {
  //   user: {
  //     id: resultLogin.id,
  //     username: resultLogin.username,
  //     role: resultLogin.role,
  //     email,
  //   },
  //   token: createToken,
  // };
};

export default {
  login,
};
