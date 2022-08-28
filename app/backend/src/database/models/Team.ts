import { Model, STRING } from 'sequelize';
import db from '.';
import Match from './Match';

class Team extends Model {
  id?: number;
  teamName: string;
}
Team.init({
  teamName: {
    type: STRING(40),
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'teams',
  underscored: true,
});

Team.hasMany(Match, { foreignKey: 'id', as: 'idHome' });
Team.hasMany(Match, { foreignKey: 'id', as: 'idAway' });

Match.belongsTo(Team, { foreignKey: 'home_team', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'away_team', as: 'teamAway' });

export default Team;
