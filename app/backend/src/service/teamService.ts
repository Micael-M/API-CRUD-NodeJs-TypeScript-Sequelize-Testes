import Team from '../database/models/Team';

const getTeams = async (): Promise<Team[]> => {
  const resultTeams = await Team.findAll();
  return resultTeams;
};

export default {
  getTeams,
};
