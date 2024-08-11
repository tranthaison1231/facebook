import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { GetPresignedUrlDto } from './dto/get-presign-url.dto';
import { UploadService } from './upload.service';

@Controller('upload')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('/presigned-url')
  async presignedUrl(@Body() body: GetPresignedUrlDto) {
    return this.uploadService.presignedUrlS3(body);
  }
}
