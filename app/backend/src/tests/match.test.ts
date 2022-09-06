import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';

import {IMatch} from '../interfaces/interface';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica se a API retorna os dados corretamente na rota /matches', async () => {
  let chaiHttpResponse: Response;
  const arrayMatches = [
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
    {
      id: 2,
      homeTeam: 9,
      homeTeamGoals: 1,
      awayTeam: 14,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "Internacional",
      },
      teamAway: {
        teamName: "Santos",
      }
    },
    {
      id: 3,
      homeTeam: 4,
      homeTeamGoals: 3,
      awayTeam: 11,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "Corinthians",
      },
      teamAway: {
        teamName: "Napoli-SC",
      }
    },
    {
      id: 4,
      homeTeam: 3,
      homeTeamGoals: 0,
      awayTeam: 2,
      awayTeamGoals: 0,
      inProgress: false,
      teamHome: {
        teamName: "Botafogo",
      },
      teamAway: {
        teamName: "Bahia",
      }
    },
  ];

  beforeEach(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(arrayMatches as IMatch[]);
  });

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Em caso de sucesso, busca por jogos finalizados retornando o status 200', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches')

    const array = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(array.length).to.be.equal(4);
    expect(array).to.deep.equal(arrayMatches);
  });

  it('busca pelos jogos finalizados no banco de dados, retornando um array e status "200", caso não haja falha', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
    
    const array = chaiHttpResponse.body;
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(array.length).to.be.equal(4);
    expect(array[0].inProgress).to.be.equal(false);
    expect(array).to.deep.equal(arrayMatches);
  });
});

describe('Verifica se a API retorna os dados corretamente, quando:', async () => {
  let chaiHttpResponse: Response;

  const matchesInProgress = [
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
      }
    },
    {
      id: 42,
      homeTeam: 6,
      homeTeamGoals: 1,
      awayTeam: 1,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
          teamName: 'Ferroviária',
      },
      teamAway: {
          teamName: 'Avaí/Kindermann',
      }
    },
    {
      id: 43,
      homeTeam: 11,
      homeTeamGoals: 0,
      awayTeam: 10,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
          teamName: 'Napoli-SC',
      },
      teamAway: {
          teamName: 'Minas Brasília',
      }
    },
    {
      id: 44,
      homeTeam: 7,
      homeTeamGoals: 2,
      awayTeam: 15,
      awayTeamGoals: 2,
      inProgress: true,
      teamHome: {
        teamName: 'Flamengo',
      },
      teamAway: {
        teamName: 'São José-SP',
      }
    }
  ];
  
  beforeEach(async () => {    
     sinon
      .stub(Match, "findAll")
      .resolves(matchesInProgress as IMatch[]);
  });

  
  afterEach(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('busca pelos jogos em andamento no banco de dados, retornando um array e status "200", caso não haja falha', async () => {
    
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
    
    const array = chaiHttpResponse.body;
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(array.length).to.be.equal(4);
    expect(array[0].inProgress).to.be.equal(true);
    expect(array).to.deep.equal(matchesInProgress);
  });
});
