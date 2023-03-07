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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

// Controller class handled application errors and transform them to REST API Errors (Using native NestJs errors)
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiTags('Create one pokemon')
  async create(@Body() createPokemonDto: CreatePokemonDto) {
    try {
      return await this.pokemonService.create(createPokemonDto);
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
  @ApiTags('Get all pokemons')
  findAll(@Query() query: GetAllPokemonsDto): Promise<{total: number, pokemons:Pokemon[]}> {
    return this.pokemonService.findAll(query);
  }

  @Get(':name')
  @ApiTags('Get one pokemon')
  async findOne(@Param('name') name: string): Promise<Pokemon> {
    try {
      return await this.pokemonService.findOne({ name });
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
  @ApiTags('Update one pokemon')
  async update(
    @Param('name') name: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    try {
      return await this.pokemonService.updateOne(
        { name },
        updatePokemonDto,
      );
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
  @ApiTags('Remove one pokemmon')
  async remove(@Param('name') name: string): Promise<Pokemon> {
    try {
      return await this.pokemonService.deleteOne({ name });
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
