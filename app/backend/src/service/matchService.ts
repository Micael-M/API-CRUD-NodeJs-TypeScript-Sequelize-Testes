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

const createMatch = async (dataMatch: ICreateMatch, token: any) => {
  console.log('Dentro do Match Service');
  await jwtToken.decodeToken(token);
  // console.log(token);
  // console.log(dataMatch);
  const restultCreateMatch = await Match.create(dataMatch);
  return restultCreateMatch;
};

export default {
  getAllMatchs,
  getMatchesFiltred,
  createMatch,
};
