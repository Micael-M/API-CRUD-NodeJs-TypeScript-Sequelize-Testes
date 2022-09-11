import * as Sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Team from '../database/models/Team';
import leaderboardService from '../service/leaderboardService';
import Match from '../database/models/Match';
import { IMatch } from '../interfaces/interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('No leaderboardController', async () => {

  const teamHome = {
    name: "Santos",
    totalPoints: 9,
    totalGames: 3,
    totalVictories: 3,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 9,
    goalsOwn: 3,
    goalsBalance: 6,
    efficiency: "100.00"
  }

  const teamAway = {
    name: "Palmeiras",
    totalPoints: 6,
    totalGames: 2,
    totalVictories: 2,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 7,
    goalsOwn: 0,
    goalsBalance: 7,
    efficiency: "100.00"
  }

  const dataMatches = [
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo",
      },
      teamAway: {
        teamName: "Grêmio",
      }
    },
  ];

  const dataTeams = [
    { id: 1, teamName: 'Avaí/Kindermann' },
    { id: 2, teamName: 'Bahia' },
    { id: 3, teamName: 'Botafogo' },
    { id: 4, teamName: 'Corinthians' },
    { id: 5, teamName: 'Cruzeiro' },
    { id: 6, teamName: 'Ferroviária' },
  ];

  beforeEach(() => {
    Sinon.stub(Team, "findAll").resolves(dataTeams as Team[]);
    Sinon.stub(Match, "findAll").resolves(dataMatches as IMatch[]);
  });

  afterEach(() => {
    (Team.findAll as Sinon.SinonStub).restore();
    (Match.findAll as Sinon.SinonStub).restore();
  });

  describe('GET /leaderboard/home', () => {
    it('Em caso de sucesso - Retorna status 200 e a classificação do time mandante', async () => {
      const response = await chai.request(app).get('/leaderboard/home');
      expect(response.status).to.deep.equal(200);
      expect(teamHome).to.deep.equal(teamHome);
    });
  });

  describe('GET /leaderboard/away', () => {
    it('Em caso de sucesso - Retorna status 200 e a classificação do time visitante', async () => {
      const response = await chai.request(app).get('/leaderboard/away');
      expect(response.status).to.deep.equal(200);
      expect(teamAway).to.deep.equal(teamAway);
    });
  });

  describe('GET - /leaderboarder/home', () => {
    it('Teste se a função "getHomeTeamTable" foi chamada', async () => {
      Sinon.stub(leaderboardService, "getHomeTeamTable");
      await chai.request(app).get('/leaderboard/home');

      const stub = leaderboardService.getHomeTeamTable as Sinon.SinonStub;
      expect(stub.called).to.be.true;
    });
  });
});
