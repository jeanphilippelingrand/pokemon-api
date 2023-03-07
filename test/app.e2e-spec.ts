import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma.service';

// for e2e tests we mock the prisma client (Database client)
describe('AppController (e2e)', () => {
  let app: INestApplication;
  // the following mocked implementation can be accessed inside the test suites.
  // those are default implementation and sometimes overwritten within the test suite.
  const mockPokemon = {
    name: 'test',
    type1: 'fake type',
    type2: 'fake type 2',
    Total: 10,
    HP: 20,
    Attack: 30,
    Defense: 40,
    SpAtk: 50,
    SpDef: 60,
    Speed: 70,
    Generation: 80,
  };
  const mockPrismaService = {
    pokemon: {
      count: jest.fn().mockResolvedValue(1),
      findMany: jest.fn().mockResolvedValue([mockPokemon]),
      findUnique: jest.fn().mockResolvedValue(mockPokemon),
      create: jest.fn().mockResolvedValue(mockPokemon),
    },
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/pokemon/:pokemon_name (GET)', () => {
    it('200 when the record is in the db', () => {
      return request(app.getHttpServer())
        .get('/pokemon/pikatchu')
        .expect(200)
        .expect(mockPokemon);
    });

    it('404 when the record is not in the db', () => {
      // db returns nothing
      mockPrismaService.pokemon.findUnique = jest
        .fn()
        .mockResolvedValue(undefined);

      return request(app.getHttpServer())
        .get('/pokemon/pikatchu')
        .expect(404)
        .expect({
          statusCode: 404,
          message:
            'No pokemon with that name exists. It needs to be created first.',
          error: 'Not Found',
        });
    });
  });

  // TODO: Cover other API endpoints (Get all, create, delete, update)
});
