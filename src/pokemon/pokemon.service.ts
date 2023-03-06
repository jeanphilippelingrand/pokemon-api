import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pokemon, Prisma } from '@prisma/client';
import { PokemonAlreadyExistsError } from './errors/PokemonAlreadyExists.error';
import { PokemonDoesntExistError } from './errors/PokemonDoesntExist.error';
import { parse } from 'csv'
import { createReadStream } from 'fs';

@Injectable()
export class PokemonService implements OnApplicationBootstrap {

  constructor(private prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    const count = await this.prismaService.pokemon.count();
    if (count > 0) {
      return
    }
    const rawPokemons: {
      [key:string]: string
    }[] = []
    await new Promise<void>((resolve, reject) => {
      try {
        createReadStream('./pokemons.csv')
        .pipe(parse({ columns: true}))
        .on('data', (row => {
          rawPokemons.push(row)
        }))
        .on('end', () => {
          resolve()
        })
      } catch(e){
        reject(e)
      }
    })
    const transactions = rawPokemons.map(row => {
      return this.prismaService.pokemon.create({
       data: {
        name: row['Name'],
        type1: row['Type 1'],
        type2: row['Type 2'],
        Total: +row['Total'],
        HP: +row['HP'],
        Attack: +row['Attack'],
        Defense: +row['Defense'],
        Speed: +row['Speed'],
        SpAtk: +row['Sp. Atk'],
        SpDef: +row['Sp. Def'],
        Generation: +row['Generation']
       } 
      })
    });
    this.prismaService.$transaction(transactions)
  }

  async create(createInput: Prisma.PokemonCreateInput) {
    const count = await this.prismaService.pokemon.count({
      where: { name: createInput.name },
    });
    if (count > 0) {
      throw new PokemonAlreadyExistsError();
    }
    return this.prismaService.pokemon.create({ data: createInput });
  }

  async findAll(query: Prisma.PokemonFindManyArgs) {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const total = await this.prismaService.pokemon.count()
    const pokemons = await this.prismaService.pokemon.findMany({
      skip,
      take,
    });
    return {total, pokemons}
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
      const updatedPokemon = await this.prismaService.pokemon.update({
        where,
        data: updateInput,
      });
      return updatedPokemon
    } catch (e) {
      if (e.code === 'P2025') {
        throw new PokemonDoesntExistError()
      } 
      throw e
    }
  }

  async deleteOne(where: Prisma.PokemonWhereUniqueInput) {
    try {
      const deletedPokemon = await this.prismaService.pokemon.delete({
        where,
      });
      return deletedPokemon
    } catch(e) {
      if (e.code === 'P2025') {
        throw new PokemonDoesntExistError()
      } 
      throw e
    }
  }
}
