import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PokemonController],
  providers: [PrismaService, PokemonService],
})
export class PokemonModule {}
