import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id?: number;
  username: string;
  role:string;
  email: string;
  password: string;
}

User.init({
  username: {
    type: STRING(40),
    allowNull: false,
  },
  email: {
    type: STRING(40),
    allowNull: false,
  },
  role: {
    type: STRING(40),
    allowNull: false,
  },
  password: {
    type: STRING(40),
    allowNull: false,
  },
}, {
  sequelize: db,
  timestamps: false,
  modelName: 'users',
});

export default User;
