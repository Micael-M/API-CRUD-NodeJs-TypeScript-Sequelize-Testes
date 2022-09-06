import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IClassification } from '../interfaces/interface';

let getInfoTeam: Team[];
let getInfoMatch: Match[];
const classfication: IClassification[];
let points: number;
let victories: number;
let draws: number;
let loss: number;
let goalsFavor: number;
let goalsOwn: number;
let goalsBalance: number;

const getGameById = (id: number | undefined) => {
  const getMatch = getInfoMatch.filter((match) => {
    match.homeTeam === id && match.inProgress === false;
  });
  return getMatch;
};

const getTablePoints = (id: number | undefined) => {
  const getGames = getGameById(id);
  points = 0;
  victories = 0;
  draws = 0;
  loss = 0;
  getGames.map((game) => {
    if (game.homeTeamGoals > game.awayTeamGoals) {
      points += 3;
      victories += 1;
    }
    if (game.homeTeamGoals === game.awayTeamGoals) {
      points += 1;
      draws += 1;
    }
    if (game.homeTeamGoals < game.awayTeamGoals) {
      loss += 1;
      return points;
    };
  });
  return { points }
};

const getHomeTeam = async () => {
  getInfoTeam = await Team.findAll();
  getInfoMatch = await Match.findAll();
  getInfoTeam.map((team) => {
    const infoTable = {
      name: team.teamName,
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: loss,
      goalsFavor:
      goalsOwn,
      goalsBalance,
      efficiency:
    };
    return infoTable;
  });
  const getResult = 'olá';
  return getResult;
};

export default {
  getHomeTeam,
};
