import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString({ each: true })
  @ApiProperty()
  permissionIds: string[];
}
