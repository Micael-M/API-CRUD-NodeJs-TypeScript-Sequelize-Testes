import Team from '../database/models/Team';
import Match from '../database/models/Match';

let getInfoTeam: Team[];
let getInfoMatch: Match[];
let victories: number;
let draws: number;
let loss: number;

const getHomeTeam = async () => {
  getInfoTeam = await Team.findAll();
  getInfoMatch = await Match.findAll();
  getInfoTeam.map((team) => {
    const infoTable = {
      name: team.teamName,
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: loss,
      // goalsFavor:
      // goalsOwn:
      // goalsBalance:
      // efficiency:
    };
    console.log(infoTable);
    return infoTable;
  });
  console.log(getInfoTeam);
  console.log(getInfoMatch);
  const getResult = 'olá';
  return getResult;
};

export default {
  getHomeTeam,
};
