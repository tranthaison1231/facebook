import { Type } from 'class-transformer';
import { IsString, IsInt, Min, IsOptional, Max } from 'class-validator';

export class GetPostsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsInt()
  @Max(100)
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  startingId?: string;
}
