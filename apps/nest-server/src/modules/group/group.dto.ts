import { Type } from 'class-transformer';
import { IsString, Min, IsOptional, Max, IsEnum } from 'class-validator';
import { TypeOfGroup } from '@prisma/client';

export class GroupDto {
  @Type(() => String)
  @IsString()
  @Min(3)
  @Max(255)
  name: string;

  @Type(() => String)
  @IsString()
  @IsEnum([TypeOfGroup.PUBLIC, TypeOfGroup.PRIVATE])
  @IsOptional()
  type: TypeOfGroup;
}
