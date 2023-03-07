import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type1: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type2: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  hp: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  attack: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  defense: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  spAtk: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  spDef: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  speed: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  generation: number;
}
