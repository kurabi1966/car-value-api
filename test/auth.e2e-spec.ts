import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { rm } from 'fs/promises';
import { join } from 'path';

describe('Authentication System (e2e)', () => {
  let app: INestApplication;
  beforeEach(async () => {
    try {
      await rm(join(__dirname, '..', 'test_data.db'));
    } catch (error) {
      console.debug('test_data.db does not exist');
    }

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();


    await app.init();
  });

  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email: "a@a.com", password: "!Q2w#E4r"})
      .expect(201)
      .then((res)=>{
        const {id, email} = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual("a@a.com");
      });
  });

  it('signup as a new user and return the user by calling whoami', async () => {
    const email = "ammar@test.net";
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({email: email, password: "!Q2w#E4r"})
      .expect(201);

    const cookie = response.get('Set-Cookie');

    return await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .then((res) => {
        expect(res.body.email).toEqual(email);
        expect(res.body.id).toBeDefined();
      })
  });

  afterAll(async () => {
    await app.close();
  });
});
