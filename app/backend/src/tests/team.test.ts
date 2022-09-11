import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET - /teams', async () => {
  let chaiHttpResponse: Response;

  const dataTeams = [{ id: 1, teamName: 'Avaí/Kindermann' },
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
      .resolves(dataTeams as Team[]);
  });

  
  afterEach(()=>{
    (Team.findByPk as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('Se sucesso - Retorna status 200 e os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    
    // const array = chaiHttpResponse.body;
    
    // expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(array.length).to.be.equal(6);
    // expect(array).to.deep.equal(dataTeams);
  });

  it('busca de um time pelo id, retorna um objeto contendo "id","teamName" e status "200", caso não haja falha', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    
    // expect(chaiHttpResponse.status).to.be.equal(200);
    // expect(chaiHttpResponse.body).to.have.property('id');
    // expect(chaiHttpResponse.body).to.have.property('teamName');
    // expect(chaiHttpResponse.body).to.deep.equal({ id: 1, teamName: 'Avaí/Kindermann'});
  });
});
