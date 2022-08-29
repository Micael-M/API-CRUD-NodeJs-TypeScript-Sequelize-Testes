import User from '../database/models/User';

const login = async (credentials) => {
  const { email, password } = credentials;
  const resultLogin = await User.findOne({ where: { email } });

  if (resultLogin === null) {
    return undefined;
  }

  return resultLogin;
};

export default {
  login,
};
