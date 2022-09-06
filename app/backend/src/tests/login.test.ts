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
  let chaiHttpResponse: Response;

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
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(200);
  });


  it('a requisição está correta, o objeto user possui as propriedades id, username, role e email, e com status 200', async () => {
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
       
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
  });

  it('a requisição está correta, a propriedade token não esta vazia', async () => {
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      })
    
    expect(chaiHttpResponse.body.token).to.be.not.null;
  });

  it('a tentativa de login é feita sem o email, retorna um erro com status 400 e a mensagem "All fields must be filled" ', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'secret_admin',
      })
    
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('a tentativa de login é feita sem o password, retorna um erro com status 400 e a mensagem "All fields must be filled" ', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
      })
    
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
  });

  it('a requisição é feita com a senha incorreta, retorna a mensagem: "Incorrect email or password" e o status "401"', async () => {

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_xablau',
      });


    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
  });

  it('a validação do login está correta, retorna a propriedade role com o valor "admin"', async () => {

    const login = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });
  
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', login.body.token);
    
    expect(chaiHttpResponse).to.be.not.null;
    expect(chaiHttpResponse.body).to.be.equal('admin');
  });

  it('na validação do login, recebe um token invalido, retorna um erro de JasonWebToken', async () => {
  
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW4iLCJpYXQiOjE2NTQ1OTk2MjYsImV4cCI6MTY1NDYwMzIyNn0.UjgMnZy1ZkwJZgFSOFV0JCnjyuXoocSxODEb5ud9Fu0';

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', invalidToken);
    
    expect(chaiHttpResponse).to.be.not.null;
    expect(chaiHttpResponse.body).to.have.property('message');
  });

  it('na validação do login, não recebe o token, retorna um status "401" e uma mensagem "Token not found"', async () => {
  
    const invalidToken = '';

    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', invalidToken);
    
    expect(chaiHttpResponse).to.be.not.null;
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.have.property('message');
    expect(chaiHttpResponse.body.message).to.deep.equal('Token not found');
  });
});
