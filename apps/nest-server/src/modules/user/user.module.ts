import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PostModule } from '../post/post.module';

@Module({
  imports: [PostModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
