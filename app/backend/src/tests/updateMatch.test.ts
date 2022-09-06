import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import Match from '../database/models/Match';
import Team from '../database/models/Team';
import Token from '../utils/jwtToken';

import { Response } from 'superagent';
import { IMatch } from '../interfaces/interface';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica se a API retorna os dados corretamente, quando:', async () => {
  let chaiHttpResponse: Response;
  const getToken = Token.createToken('admin');

  const createdMatch =
  {
    id: 49,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: true,
  };

  const arrayTeams = [{ id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' }];
  
  beforeEach(async () => {
    sinon
      .stub(Match, "create")
      .resolves(createdMatch as IMatch);
    
    sinon
      .stub(Team, "findAll")
      .resolves(arrayTeams as Team[]);
    
    sinon
      .stub(Match, "update")
      .resolves([1, []]);
  });

  afterEach(() => {
    (Match.create as sinon.SinonStub).restore();
    (Match.update as sinon.SinonStub).restore();
    (Team.findAll as sinon.SinonStub).restore();
  })

  it('é solicitada a criação de uma nova partida, retorna um status "201" e um objeto com a partida criada, caso não haja falha', async () => {

    const token = getToken;
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 6,
        homeTeamGoals: 1,
        awayTeam: 2,
        awayTeamGoals: 1,
        inProgress: true,
      })
      .set('authorization', token);

    const array = chaiHttpResponse.body;
    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(array).to.deep.equal(createdMatch);
  });

  it('é solicitada a criação de uma nova partida com um time mandante que não existe, retorna um status "404" e a mensagem "There is no team with such id!"', async () => {

    const token = getToken;
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 9,
        homeTeamGoals: 1,
        awayTeam: 2,
        awayTeamGoals: 1,
        inProgress: true,
      })
      .set('authorization', token);

    const array = chaiHttpResponse.body;
    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(array).to.have.property('message');
    expect(array).to.deep.equal({message: 'There is no team with such id!'});
  });

  it('é solicitada a criação de uma nova partida com um time visitante que não existe, retorna um status "404" e a mensagem "There is no team with such id!"', async () => {
  
    const token = getToken;

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 2,
        homeTeamGoals: 1,
        awayTeam: 9,
        awayTeamGoals: 1,
        inProgress: true,
      })
      .set('authorization', token);

    const array = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(array).to.have.property('message');
    expect(array).to.deep.equal({message: 'There is no team with such id!'});
  });

  it('é solicitada a criação de uma nova partida com o mesmo como mandante e visitante, retorna um status "401" e a mensagem "It is not possible to create a match with two equal teams"', async () => {

    const token = getToken;
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 2,
        homeTeamGoals: 1,
        awayTeam: 2,
        awayTeamGoals: 1,
        inProgress: true,
      })
      .set('authorization', token);

    const array = chaiHttpResponse.body;
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(array).to.have.property('message');
    expect(array).to.deep.equal({message: 'It is not possible to create a match with two equal teams'});
  });

  it('é solicitada a criação de uma nova partida sem o token, retorna um status "404" e a mensagem "Token not Found"', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .send({
        homeTeam: 5,
        homeTeamGoals: 1,
        awayTeam: 2,
        awayTeamGoals: 1,
        inProgress: true,
      })
      .set('authorization', '');

    const array = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(array).to.have.property('message');
    expect(array).to.deep.equal({message: 'Token not Found'});

  });

  it('é solicitada a atualização de resultado da partida, retorna um status "200" e a mensagem "Updated match"', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/45')
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 2,
      });

    const array = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(array).to.have.property('message');
    expect(array).to.deep.equal({message: 'Updated match'});
  });

  it('é solicitada a finalização de uma partida em andamento, retorna um status "200" e a mensagem "Finished"', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/45/finish')

    const array = chaiHttpResponse.body;

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(array).to.have.property('message');
    expect(array).to.deep.equal({message: 'Finished'});
  });
});
