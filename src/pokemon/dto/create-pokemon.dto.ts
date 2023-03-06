import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type1: string;

  @IsString()
  @IsNotEmpty()
  type2: string;

  @IsNumber()
  @IsNotEmpty()
  Total: number;

  @IsNumber()
  @IsNotEmpty()
  HP: number;

  @IsNumber()
  @IsNotEmpty()
  Attack: number;

  @IsNumber()
  @IsNotEmpty()
  Defense: number;

  @IsNumber()
  @IsNotEmpty()
  SpAtk: number;

  @IsNumber()
  @IsNotEmpty()
  SpDef: number;

  @IsNumber()
  @IsNotEmpty()
  Speed: number;

  @IsNumber()
  @IsNotEmpty()
  Generation: number;
}
