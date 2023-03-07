import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { PokemonAlreadyExistsError } from './errors/PokemonAlreadyExists.error';
import { ConflictException } from '@nestjs/common';

jest.mock('./pokemon.service');

describe('PokemonController', () => {
  let controller: PokemonController;
  const mockPokemonService = {
    create: jest.fn().mockReturnValue({}),
  };

  const mockPokemon = {
    id: 1,
    name: 'test',
    type1: 'fake type',
    type2: 'fake type 2',
    total: 10,
    hp: 20,
    attack: 30,
    defense: 40,
    spAtk: 50,
    spDef: 60,
    speed: 70,
    generation: 80,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    })
      .overrideProvider(PokemonService)
      .useValue(mockPokemonService)
      .compile();
    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('Should create using the service', async () => {
      mockPokemonService.create = jest.fn().mockResolvedValue(mockPokemon);
      const result = await controller.create(mockPokemon);
      // we expect on the result
      expect(result).toEqual(mockPokemon);
      expect(mockPokemonService.create).toHaveBeenCalledTimes(1);
      expect(mockPokemonService.create).toHaveBeenCalledWith(mockPokemon);
    });
    it('Should throw ConflictException when the service throws PokemonAlreadyExistsError', async () => {
      mockPokemonService.create = jest
        .fn()
        .mockRejectedValue(new PokemonAlreadyExistsError());

      let error;
      try {
        await controller.create(mockPokemon);
      } catch (e) {
        error = e;
      }
      expect(error).not.toBeUndefined();
      expect(error).toBeInstanceOf(ConflictException);
    });

    it('Should bubble the error when the service throws an unhandled error', async () => {
      mockPokemonService.create = jest
        .fn()
        .mockRejectedValue(new Error('Fake error'));

      let error;
      try {
        await controller.create(mockPokemon);
      } catch (e) {
        error = e;
      }
      expect(error).not.toBeUndefined();
      expect(error).toBeInstanceOf(Error);
    });
  });

  //TODO: Cover the other functions of the class (findAll, findOne, update and remove)
});
