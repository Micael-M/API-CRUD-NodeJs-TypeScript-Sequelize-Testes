import Team from '../database/models/Team';
import Match from '../database/models/Match';
import { IClassification } from '../interfaces/interface';

let getInfoTeam: Team[];
let getInfoMatch: Match[];
let dataTable: IClassification[] = [];
let points: number;
let victories: number;
let draws: number;
let loss: number;
let goalsFavor: number;
let goalsOwn: number;
let goalsBalance: number;

const getInfoTeamMatch = async () => {
  getInfoTeam = await Team.findAll();
  getInfoMatch = await Match.findAll();
};

const getGameById = (id: number | undefined) => {
  const getMatch = getInfoMatch.filter((match) => match.awayTeam === id
    && match.inProgress === false);
  return getMatch;
};

const getTablePoints = (id: number | undefined) => {
  const getGames = getGameById(id);
  points = 0;
  victories = 0;
  draws = 0;
  loss = 0;
  getGames.map((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      points += 3;
      victories += 1;
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      points += 1;
      draws += 1;
    }
    if (match.homeTeamGoals > match.awayTeamGoals) loss += 1;
    return points;
  });
  return { points };
};

const goalCounter = (id: number | undefined) => {
  const matches = getGameById(id);
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;

  matches.map((match) => {
    goalsFavor += match.awayTeamGoals;
    goalsOwn += match.homeTeamGoals;
    goalsBalance = goalsFavor - goalsOwn;
    return goalsFavor;
  });
  return { goalsFavor };
};

const matchEfficiency = (id: number | undefined) => {
  const match = getGameById(id);
  const resultPoints = getTablePoints(id);
  const calculateEfficiency = ((resultPoints.points / (match.length * 3)) * 100);
  const totalEfficiency = Number(calculateEfficiency.toFixed(2));
  return totalEfficiency;
};

const makeLeaderboard = () => {
  dataTable = [];
  getInfoTeam.map((team) => {
    const infoTable = {
      name: team.teamName,
      totalPoints: getTablePoints(team.id).points,
      totalGames: getGameById(team.id).length,
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: loss,
      goalsFavor: goalCounter(team.id).goalsFavor,
      goalsOwn,
      goalsBalance,
      efficiency: matchEfficiency(team.id),
    };
    dataTable = [...dataTable, infoTable];
    return dataTable;
  });
  return dataTable;
};

const getAwayTeamTable = async () => {
  await getInfoTeamMatch();
  const getTable = makeLeaderboard();

  getTable.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || a.goalsOwn - b.goalsOwn);
  return getTable;
};

export default {
  getAwayTeamTable,
};
