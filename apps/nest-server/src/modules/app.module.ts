import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { GroupModule } from './group/group.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, PrismaModule, GroupModule, PostModule],
})
export class AppModule {}
