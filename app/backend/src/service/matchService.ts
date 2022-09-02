import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IMatch } from '../interfaces/interface';

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

export default {
  getAllMatchs,
  getMatchesFiltred,
};
