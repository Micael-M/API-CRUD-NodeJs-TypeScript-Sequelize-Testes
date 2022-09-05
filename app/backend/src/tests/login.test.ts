import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import User from '../database/models/User';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica se a API retorna os dados corretamente na rota /login', () => {
  let chaiResponse: Response;

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

  it('Em caso de sucerro retorna o token com status 200', async () => {
    chaiResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiResponse.status).to.be.equal(200);
  });
});
