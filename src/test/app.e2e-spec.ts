import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { postInput, userDto } from './data/test-data';
import { DatabaseService } from '../database/database.service';
import { DatabaseModule } from '../database/database.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let db: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    db = moduleFixture.get<DatabaseService>(DatabaseService);
    db.emptyDb();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(HttpStatus.OK)
      .expect('Hello World!');
  });

  it('signup', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(userDto)
      .then((res) => {
        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body).toMatchObject({
          user: {
            id: expect.any(Number),
            email: userDto.email,
          },
          token: expect.any(String),
        });
      });
  });

  it('login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(userDto)
      .then((res) => {
        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body.user).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            email: userDto.email,
          }),
        );
        expect(res.body.token).toEqual(expect.any(String));
        authToken = res.body.token;
      });
  });

  it('create posts', () => {
    return request(app.getHttpServer())
      .post('/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send(postInput)
      .then((res) => {
        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body).toMatchObject({
          id: expect.any(Number),
          title: postInput.title,
        });
      });
  });

  it('upload file', () => {
    return request(app.getHttpServer())
      .post('/files/upload')
      .set('Authorization', `Bearer ${authToken}`)
      .set('Content-Type', 'multipart/form-data')
      .attach('file', `${__dirname}/data/file.png`)
      .then((res) => {
        expect(res.status).toBe(HttpStatus.CREATED);
        expect(res.body).toEqual({
          success: true,
        });
      })
      .catch((err) => console.log(err));
  });

  afterAll(async () => {
    if (app) await app.close();
  });
});
