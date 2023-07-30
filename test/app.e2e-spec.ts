import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  
  it('/categories (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send("user=" + JSON.stringify({ email: 'test@mail.ru', password: 'Qwerty12' }))
    .expect(201);
    const { access_token } = loginResponse.body;
    return request(app.getHttpServer()).get('/categories').set('Authorization', 'Bearer ' + access_token).expect(200)
  });
  
  it('/catalog (GET)', async () => {
    const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send("user=" + JSON.stringify({ email: 'test@mail.ru', password: 'Qwerty12' }))
    .expect(201);
    const { access_token } = loginResponse.body;
    return request(app.getHttpServer()).get('/catalog').set('Authorization', 'Bearer ' + access_token).expect(200)
  });

  it('/Global (POST, GET)',async () => {
    const loginResponse = await request(app.getHttpServer())
    .post('/auth/login')
    .send("user=" + JSON.stringify({ email: 'test@mail.ru', password: 'Qwerty12' }))
    .expect(201);
    const { access_token } = loginResponse.body;
    return request(app.getHttpServer())
      .post('/categories')
      .set('Authorization', 'Bearer ' + access_token)
      .send({ name: 'Новая категория' })
      .expect(201)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),   
          }),
        );
        request(app.getHttpServer())
          .get('/categories/'+res.body.id)
          .set('Authorization', 'Bearer ' + access_token)
          .expect(200)
          .expect({"id":res.body.id,"name":"Новая категория"});

        request(app.getHttpServer())
          .post('/catalog')
          .set('Authorization', 'Bearer ' + access_token)
          .send({ name: 'Новый товар', cost: 1000, category_id: res.body.id })
          .expect(201)
          .expect(res => {
            expect(res.body).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                cost: expect.any(Number),
                category_id: expect.any(Number)      
              }),
            );
            request(app.getHttpServer())
              .get('/catalog/'+res.body.id)
              .set('Authorization', 'Bearer ' + access_token)
              .expect(200)
              .expect({"id":res.body.id, name: 'Новый товар', cost: 1000, category_id: res.body.id});

            request(app.getHttpServer())
              .delete('/catalog/'+res.body.id)
              .set('Authorization', 'Bearer ' + access_token)
              .expect(200)
          })

        request(app.getHttpServer())
          .delete('/categories/' + res.body.id)
          .set('Authorization', 'Bearer ' + access_token)
          .expect(200);
        });
    })
});
