import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica se a API retorna os dados corretamente na rota /login.', async () => {

  beforeEach(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 1,
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$12$KbbHwHasvavS3Uok90gAyu1s9FalsX1u3SGlARAMBgnZi9lHdW1TC'
      } as User);


  });

  afterEach(async () => {
    (User.findOne as sinon.SinonStub).restore();
  });

  it('Em caso de sucesso, retorna status 200 e se contém a propriedade "token".', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('Em caso de sucesso, a propriedade "token" não é nulo.', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
    expect(response.body.token).to.be.not.null;
  });

  it('Ao fazer login sem o email, retorna o status 400 e a mensagem "All fields must be filled".', async () => {
    const response = await chai.request(app)
      .post('/login')
      .send({
        password: 'secret_admin',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Ao fazer login sem o password, retorna o status 400 e a mensagem "All fields must be filled".', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
      });

    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('All fields must be filled');
  });

  it('Ao fazer login sem com password incorreta, retorna status 401 e a mensagem "Incorrect email or password".', async () => {
    const response = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_secret',
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.be.equal('Incorrect email or password');
  });

  it('Ao validar login, retorna a propriedade role com o valor "admin"', async () => {
    const returnToken = await chai.request(app).post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const response = await chai.request(app).get('/login/validate')
      .set('authorization', returnToken.body.token);

    expect(response).to.be.not.null;
    expect(response.body.role).to.be.equal('admin');
  });

  it('na validação do login, não recebe o token, retorna um status "401" e uma mensagem "Token not found"', async () => {
    const invalidToken = '';

    const response = await chai.request(app).get('/login/validate')
      .set('authorization', invalidToken);

    expect(response).to.be.not.null;
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property('message');
    expect(response.body.message).to.deep.equal('Token not found');
  });
});
