import { Injectable} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pokemon, Prisma} from '@prisma/client';
import { PokemonAlreadyExistsError } from './errors/PokemonAlreadyExists.error';
import { PokemonDoesntExistError } from './errors/PokemonDoesntExist.error';
import { RepositoryError } from './errors/Repository.error';

@Injectable()
export class PokemonService {

  constructor(private prismaService: PrismaService) {}

  async create(createInput: Prisma.PokemonCreateInput): Promise<Pokemon> {
    try {
      return await this.prismaService.pokemon.create({ data: createInput });
    } catch(e) {
      if(e.code === PrismaService.UNIQUE_CONTRAINT_ERROR_CODE) {
        throw new PokemonAlreadyExistsError();
      }
      throw new RepositoryError(e)
    }
  }

  async findAll(query: Prisma.PokemonFindManyArgs) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    // Calling twice the db for one API call is not ideal
    // Using transactions could allow to group those two operations together
    try {
      const total = await this.prismaService.pokemon.count()
      const pokemons = await this.prismaService.pokemon.findMany({
        skip,
        take,
      });
      return {total, pokemons}
    } catch(e) {
      throw new RepositoryError(e)
    }
  }

  async findOne(where: Prisma.PokemonWhereUniqueInput): Promise<Pokemon> {
      const pokemon = await this.prismaService.pokemon.findUnique({ where });
      if (!pokemon) {
        throw new PokemonDoesntExistError()
      }
      return pokemon
  }

  async updateOne(
    where: Prisma.PokemonWhereUniqueInput,
    updateInput: Prisma.PokemonUpdateInput,
  ) {
    try {
      return await this.prismaService.pokemon.update({
        where,
        data: updateInput,
      });
    } catch (e) {
      if (e.code === PrismaService.ENTITY_NOT_FOUND_ERROR_CODE) {
        throw new PokemonDoesntExistError()
      } 
      throw new RepositoryError(e)
    }
  }

  async deleteOne(where: Prisma.PokemonWhereUniqueInput) {
    try {
      return await this.prismaService.pokemon.delete({
        where,
      });
    } catch(e) {
      if (e.code === PrismaService.ENTITY_NOT_FOUND_ERROR_CODE) {
        throw new PokemonDoesntExistError()
      } 
      throw new RepositoryError(e)
    }
  }
}
