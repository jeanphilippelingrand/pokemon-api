import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllPokemonsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip: number;
}
