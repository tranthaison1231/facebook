import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ each: true })
  @ApiProperty()
  roleIds: string[];
}
