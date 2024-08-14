import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionRepository } from './permission.repository';

@Module({
  providers: [PermissionService, PermissionRepository],
  controllers: [PermissionController],
})
export class PermissionModule {}
