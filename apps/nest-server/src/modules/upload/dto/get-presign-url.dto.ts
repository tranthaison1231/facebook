import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class GetPresignedUrlDto {
  @IsString()
  @ApiProperty()
  fileName: string;

  @IsString()
  @ApiProperty()
  type: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  folderPrefix?: string;
}
