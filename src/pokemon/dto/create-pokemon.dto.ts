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
  Total: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  HP: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  Attack: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  Defense: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  SpAtk: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  SpDef: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  Speed: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  Generation: number;
}
