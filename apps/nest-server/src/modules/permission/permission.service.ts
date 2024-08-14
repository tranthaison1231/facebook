import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';
import { CreatePermissionDto } from './dto/create-permission.dto';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async findAll() {
    const permissions = await this.permissionRepository.findAll();

    return {
      items: permissions,
    };
  }

  async create(createPermissionDto: CreatePermissionDto) {
    return this.permissionRepository.create(createPermissionDto);
  }
}
