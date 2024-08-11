import { Injectable } from '@nestjs/common';
import { GetPresignedUrlDto } from './dto/get-presign-url.dto';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private awsRegion: string;
  private awsBucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.awsRegion = this.configService.get('AWS_REGION');
    this.awsBucketName = this.configService.get('AWS_BUCKET_NAME');

    const awsAccessKeyId = this.configService.get('AWS_ACCESS_KEY_ID');

    const awsSecretAccessKey = this.configService.get('AWS_SECRET_ACCESS_KEY');

    this.s3 = new S3Client({
      region: this.awsRegion,
      credentials: {
        accessKeyId: awsAccessKeyId,
        secretAccessKey: awsSecretAccessKey,
      },
    });
  }

  getFileName = (fileName: string) => {
    return `${new Date().getTime()}.${fileName.split('.').pop()}`;
  };

  async presignedUrlS3({ fileName, type, folderPrefix }: GetPresignedUrlDto) {
    try {
      const key = folderPrefix
        ? `${folderPrefix}/${this.getFileName(fileName)}`
        : this.getFileName(fileName);

      const command = new PutObjectCommand({
        Key: key,
        Bucket: this.awsBucketName,
        ContentType: type,
        ACL: 'bucket-owner-full-control',
      });
      const uploadUrl = await getSignedUrl(this.s3, command, {
        expiresIn: 3600,
      });

      return {
        uploadUrl,
        url: `https://${this.awsBucketName}.s3.${this.awsRegion}.amazonaws.com/${key}`,
      };
    } catch (error) {
      console.error('Error getting file with S3: ', error);
      throw error;
    }
  }
}
