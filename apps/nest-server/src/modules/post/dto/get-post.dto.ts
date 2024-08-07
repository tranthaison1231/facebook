import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsInt, Min, IsOptional, Max } from 'class-validator';

export class GetPostsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  @ApiProperty()
  page?: number;

  @Type(() => Number)
  @IsInt()
  @Max(100)
  @IsOptional()
  @ApiProperty()
  limit?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  startingId?: string;
}
