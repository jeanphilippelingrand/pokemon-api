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
  ValidationPipe,
  UsePipes
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from '@prisma/client';
import { PokemonAlreadyExistsError } from './errors/PokemonAlreadyExists.error';
import { GetAllPokemonsDto } from './dto/get-all-pokemons.dto';
import { PokemonDoesntExistError } from './errors/PokemonDoesntExist.error';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// Controller class handled application errors and transform them to REST API Errors (Using native NestJs errors)
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiTags('Create one pokemon')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description:
      'Conflict error: A pokemon with this name already exists. Pokemon names are unique.',
  })
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
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
  @ApiResponse({ status: 200, description: 'Successfully returns pokemons' })
  findAll(
    @Query() query: GetAllPokemonsDto,
  ): Promise<{ total: number; pokemons: Pokemon[] }> {
    return this.pokemonService.findAll(query);
  }

  @Get(':name')
  @ApiTags('Get one pokemon')
  @ApiResponse({ status: 200, description: 'Successfully returns the pokemon' })
  @ApiResponse({
    status: 404,
    description:
      'No pokemon with that name exists. It needs to be created first.',
  })
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
  @ApiResponse({ status: 200, description: 'Successfully updated the pokemon' })
  @ApiResponse({
    status: 406,
    description:
      'No pokemon with that name exists. It needs to be created first.',
  })
  @UsePipes(new ValidationPipe({transform: true, whitelist: true}))
  async update(
    @Param('name') name: string,
    @Body() updatePokemonDto: UpdatePokemonDto,
  ): Promise<Pokemon> {
    try {
      return await this.pokemonService.updateOne({ name }, updatePokemonDto);
    } catch (error) {
      console.error(error)
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
  @ApiResponse({ status: 200, description: 'Successfully removed the pokemon' })
  @ApiResponse({
    status: 406,
    description:
      'No pokemon with that name exists. It needs to be created first.',
  })
  async remove(@Param('name') name: string): Promise<Pokemon> {
    try {
      return await this.pokemonService.deleteOne({ name });
    } catch (error) {
      if (error instanceof PokemonDoesntExistError) {
        throw new NotAcceptableException(
          'No pokemon with that name exists. It needs to be created first.',
        );
      }
      throw error;
    }
  }
}
