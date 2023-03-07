import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  controllers: [AppController],
  imports: [PokemonModule],
})
export class AppModule {}
