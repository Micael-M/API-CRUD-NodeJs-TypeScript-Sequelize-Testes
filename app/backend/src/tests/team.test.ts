import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica se a API retorna os dados corretamente na rota /teams', async () => {
  let chaiHttpResponse: Response;

  const arrayTeams = [{ id: 1, teamName: 'Avaí/Kindermann' },
    { id: 2, teamName: 'Bahia' },
    { id: 3, teamName: 'Botafogo' },
    { id: 4, teamName: 'Corinthians' },
    { id: 5, teamName: 'Cruzeiro' },
    { id: 6, teamName: 'Ferroviária' }];
  
  beforeEach(async () => {    
    sinon
    .stub(Team, "findByPk")
    .resolves({ id: 1, teamName: 'Avaí/Kindermann' } as Team);

    sinon
      .stub(Team, "findAll")
      .resolves(arrayTeams as Team[]);
  });

  
  afterEach(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Em caso de sucesso, busca por todos os times retornando o status 200', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    
    const array = chaiHttpResponse.body;
    
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(array.length).to.be.equal(6);
    expect(array).to.deep.equal(arrayTeams);
  });
});
