import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PrismaService } from '../prisma.service';
import { PokemonSeedsService } from './pokemonsSeeds.service';

@Module({
  controllers: [PokemonController],
  providers: [PrismaService, PokemonService, PokemonSeedsService],
})
export class PokemonModule {}
