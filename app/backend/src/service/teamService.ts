import Team from '../database/models/Team';

const getTeams = async (): Promise<Team[]> => {
  const resultTeams = await Team.findAll();
  return resultTeams;
};

const getTemaById = async (id: number): Promise<Team> => {
  const resultTeamId = await Team.findByPk(id);
  return resultTeamId as Team;
};

export default {
  getTeams,
  getTemaById,
};
