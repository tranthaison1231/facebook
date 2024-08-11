import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GroupModule } from './group/group.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { StoreConfig } from 'cache-manager';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        ({
          store: redisStore,
          url: configService.get<string>('REDIS_URL'),
        }) as StoreConfig,
      isGlobal: true,
    }),
    UserModule,
    PrismaModule,
    GroupModule,
    PostModule,
    AuthModule,
    UploadModule,
  ],
})
export class AppModule {}
