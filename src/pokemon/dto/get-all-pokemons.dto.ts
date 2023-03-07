import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetAllPokemonsDto {
  @ApiProperty({required: false})
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take: number;

  @ApiProperty({required: false})
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip: number;
}
