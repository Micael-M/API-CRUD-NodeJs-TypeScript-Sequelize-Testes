import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch, ICreateMatch } from '../interfaces/interface';
import jwtToken from '../utils/jwtToken';

const getAllMatchs = async (): Promise<IMatch[]> => {
  const resultMatches = await Match.findAll({
    attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });
  return resultMatches as IMatch[];
};

const getMatchesFiltred = async (queryParams: boolean): Promise<IMatch[]> => {
  const resultMatchesFiltred = await Match.findAll({
    where: { inProgress: queryParams },
    attributes: ['id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress'],
    include: [
      { model: Team, as: 'teamHome', attributes: ['teamName'] },
      { model: Team, as: 'teamAway', attributes: ['teamName'] },
    ],
  });
  return resultMatchesFiltred as IMatch[];
};

const tokenValidation = async (token: string) => {
  console.log('Entrou na tokenValidation');
  try {
    const result = jwtToken.decodeToken(token);
    return result;
  } catch (err) {
    return undefined; // { message: 'Token must be a valid token' }
  }
};

const createMatch = async (dataMatch: ICreateMatch, token: any) => {
  const resultCheckToken = await tokenValidation(token);
  if (resultCheckToken === undefined) {
    return undefined;
  }
  const restultCreateMatch = await Match.create(dataMatch);
  return restultCreateMatch;
};

const matchFinish = async (id: number) => {
  await Match.update({ inProgress: false }, { where: { id } });
  return {
    message: 'Finished',
  };
};

const updateMatch = async (homeTeamGoals: number, awayTeamGoals: number, id: string) => {
  await Match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  return { message: 'Match has been updated!' };
};

export default {
  getAllMatchs,
  getMatchesFiltred,
  createMatch,
  matchFinish,
  tokenValidation,
  updateMatch,
};
