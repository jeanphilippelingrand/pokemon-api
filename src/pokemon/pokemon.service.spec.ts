import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { PokemonAlreadyExistsError } from './errors/PokemonAlreadyExists.error';
import { RepositoryError } from './errors/Repository.error';
import { PokemonService } from './pokemon.service';

describe.only('PokemonService', () => {
  let service: PokemonService;
    // the following mocked implementation can be accessed inside the test suites.
    const mockPrismaService = {
      pokemon: {
          count: jest.fn().mockResolvedValue(1),
          findMany: jest.fn().mockResolvedValue('mockedPrismaResponse'),
          create: jest.fn().mockResolvedValue({}),
      },
  };
  const mockPokemon = {
    id: 1,
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
    Generation: 80
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [PrismaService, PokemonService],
    })
    .overrideProvider(PrismaService).useValue(mockPrismaService).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('Should find all pokemons from prisma', async () => {
      const result = await service.findAll({skip: 20, take: 55})
      
      // we expect on the result
      expect(result).toEqual({total: 1, pokemons: 'mockedPrismaResponse'})

      // and expect also on the db calls
      expect(mockPrismaService.pokemon.findMany).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.pokemon.findMany).toHaveBeenCalledWith({skip: 20, take: 55})
    })

    it('Should throw RepositoryError if prisma throw an unhandled error', async () => {
      mockPrismaService.pokemon.findMany = jest.fn().mockRejectedValue({code: 1, cause: 'Fake error cause'})
      let error
      try {
        await service.findAll({})
      } catch (e) {
        error = e
      }
      expect(error).not.toBeUndefined()
      expect(error).toBeInstanceOf(RepositoryError)
    })
  })

  describe('Create', () => {
    it('Should create a pokemon with prisma', async () => {
      mockPrismaService.pokemon.create = jest.fn().mockResolvedValue(mockPokemon)
      const result = await service.create(mockPokemon)

      // we expect on the result
      expect(result).toEqual(mockPokemon)

      // and expect also on the db calls
      expect(mockPrismaService.pokemon.create).toHaveBeenCalledTimes(1)
      expect(mockPrismaService.pokemon.create).toHaveBeenCalledWith({data: mockPokemon})
    })

    it('Should throw PokemonAlreadyExistsError when prisma throws Unique constraint error', async () => {
      mockPrismaService.pokemon.create = jest.fn().mockRejectedValue({code: PrismaService.UNIQUE_CONTRAINT_ERROR_CODE})

      let error
      try {
        await service.create(mockPokemon)
      } catch (e) {
        error = e
      }
      expect(error).not.toBeUndefined()
      expect(error).toBeInstanceOf(PokemonAlreadyExistsError)
    })

    it('Should throw RepositoryError if prisma throw an unhandled error', async () => {
      mockPrismaService.pokemon.create = jest.fn().mockRejectedValue({code: 1, cause: 'Fake error cause'})

      let error
      try {
        await service.create(mockPokemon)
      } catch (e) {
        error = e
      }
      expect(error).not.toBeUndefined()
      expect(error).toBeInstanceOf(RepositoryError)
    })
  })

  // TODO: Cover other functions of the service (update, delete, findOne)

});
