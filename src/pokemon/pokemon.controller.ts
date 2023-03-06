import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotAcceptableException,
  Query,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from '@prisma/client';
import { PokemonAlreadyExistsError } from './errors/PokemonAlreadyExists.error';
import { GetAllPokemonsDto } from './dto/get-all-pokemons.dto';
import { PokemonDoesntExistError } from './errors/PokemonDoesntExist.error';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    try {
      const result = await this.pokemonService.create(createPokemonDto);
      return result;
    } catch (error) {
      if (error instanceof PokemonAlreadyExistsError) {
        throw new ConflictException(
          'A pokemon with this name already exists. Pokemon names are unique.',
        );
      }
      throw error;
    }
  }

  @Get()
  findAll(@Query() query: GetAllPokemonsDto): Promise<Pokemon[]> {
    return this.pokemonService.findAll(query);
  }

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Pokemon> {
    try {
      const result = await this.pokemonService.findOne({ name });
      return result;
    } catch (error) {
      if (error instanceof PokemonDoesntExistError) {
        throw new NotFoundException(
          'No pokemon with that name exists. It needs to be created first.',
        );
      }
      throw error;
    }
  }

  @Patch(':name')
  async update(
    @Param('name') name: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    try {
      const result = await this.pokemonService.updateOne(
        { name },
        updatePokemonDto,
      );
      return result;
    } catch (error) {
      if (error instanceof PokemonDoesntExistError) {
        throw new NotAcceptableException(
          'No pokemon with that name exists. It needs to be created first.',
        );
      }
      throw error;
    }
  }

  @Delete(':name')
  async remove(@Param('name') name: string): Promise<Pokemon> {
    try {
      const result = await this.pokemonService.deleteOne({ name });
      return result;
    } catch (error) {
      if (error instanceof PokemonDoesntExistError) {
        throw new NotFoundException(
          'No pokemon with that name exists. It needs to be created first.',
        );
      }
      throw error;
    }
  }
}
