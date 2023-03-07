import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { parse } from 'csv';
import { createReadStream } from 'fs';

@Injectable()
export class PokemonSeedsService implements OnApplicationBootstrap {
  constructor(private prismaService: PrismaService) {}

  async onApplicationBootstrap() {
    const count = await this.prismaService.pokemon.count();
    if (count > 0) {
      return;
    }
    const rawPokemons: {
      [key: string]: string;
    }[] = [];
    await new Promise<void>((resolve, reject) => {
      try {
        createReadStream('./pokemons.csv')
          .pipe(parse({ columns: true }))
          .on('data', (row) => {
            rawPokemons.push(row);
          })
          .on('end', () => {
            resolve();
          });
      } catch (e) {
        reject(e);
      }
    });
    const transactions = rawPokemons.map((row) => {
      return this.prismaService.pokemon.create({
        data: {
          id: +row['#'],
          name: row['Name'],
          type1: row['Type 1'],
          type2: row['Type 2'],
          total: +row['Total'],
          hp: +row['HP'],
          attack: +row['Attack'],
          defense: +row['Defense'],
          speed: +row['Speed'],
          spAtk: +row['Sp. Atk'],
          spDef: +row['Sp. Def'],
          generation: +row['Generation'],
        },
      });
    });
    this.prismaService.$transaction(transactions);
  }
}
