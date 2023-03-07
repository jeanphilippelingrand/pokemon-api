import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Pokemon, Prisma } from '@prisma/client';
import { PokemonAlreadyExistsError } from './errors/PokemonAlreadyExists.error';
import { PokemonDoesntExistError } from './errors/PokemonDoesntExist.error';
import { parse } from 'csv'
import { createReadStream } from 'fs';

@Injectable()
export class PokemonSeedsService implements OnApplicationBootstrap {

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
        id: +row['#'],
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
}
