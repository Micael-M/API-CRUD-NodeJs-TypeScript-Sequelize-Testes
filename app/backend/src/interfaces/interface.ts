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

interface ICreateMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress?: boolean;
}

interface IToken {
  token: string
}

export {
  IUser,
  ILogin,
  IMatch,
  ICreateMatch,
  IToken,
};
