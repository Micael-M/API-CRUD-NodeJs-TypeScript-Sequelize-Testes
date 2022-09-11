import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';

import Match from '../database/models/Match';
import { IMatch } from '../interfaces/interface';

chai.use(chaiHttp);
const { expect } = chai;

describe('GET - /matches', async () => {
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

  beforeEach(async () => {
    sinon.stub(Match, "findAll").resolves(dataMatches as IMatch[]);
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Em caso de sucesso - Retorna status 200 e se os dados retornados estão corretos', async () => {
    const response = await chai.request(app).get('/matches');
    const dataBody = response.body;

    expect(response.status).to.be.equal(200);
    expect(dataBody.length).to.be.equal(1);
    expect(dataBody).to.deep.equal(dataMatches);
  });
});

describe('Testa a requisição em partidas finalizadas e em andamento - /matches?inProgress', async () => {

  const dataMatches = [
    {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo",
      },
      teamAway: {
        teamName: "Internacional",
      },
    },
  ];

  beforeEach(async () => {
    sinon.stub(Match, "findAll").resolves(dataMatches as IMatch[]);
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Em caso de sucesso - Retorna status 200, testa se o parametro é "true" e os dados retornado são corretos', async () => {
    const response = await chai.request(app).get('/matches?inProgress=true');
    const dataBody = response.body;

    expect(response.status).to.be.equal(200);
    expect(dataBody.length).to.be.equal(1);
    expect(dataBody[0].inProgress).to.be.equal(true);
    expect(dataBody).to.deep.equal(dataMatches);
  });

  it('Em caso de sucesso - Retorna status 200, testa se o parametro é "false" e os dados retornado são corretos', async () => {
    const response = await chai.request(app).get('/matches?inProgress=false');
    const dataBody = response.body;

    expect(response.status).to.be.equal(200);
    expect(dataBody.length).to.be.equal(1);
    expect(dataBody[0].inProgress).to.be.equal(!false);
    expect(dataBody).to.deep.equal(dataMatches);
  });
});
