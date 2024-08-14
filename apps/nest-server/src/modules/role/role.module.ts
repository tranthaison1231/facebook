import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleRepository } from './role.repository';

@Module({
  providers: [RoleService, RoleRepository],
  controllers: [RoleController],
})
export class RoleModule {}
