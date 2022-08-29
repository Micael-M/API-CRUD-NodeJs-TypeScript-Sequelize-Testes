interface IUser{
  id?: number,
  userName?: string,
  password: string,
}

interface ILogin extends IUser{
  email: string,
}

export {
  IUser,
  ILogin,
};
