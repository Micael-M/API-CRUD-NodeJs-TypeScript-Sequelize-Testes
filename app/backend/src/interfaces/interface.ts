import Match from '../database/models/Match';

interface IUser{
  id?: number,
  userName?: string,
  password: string,
}

interface ILogin extends IUser{
  email: string,
}

interface IMatch extends Match {
  teamHome: object,
  teamAway: object,
}

export {
  IUser,
  ILogin,
  IMatch,
};
