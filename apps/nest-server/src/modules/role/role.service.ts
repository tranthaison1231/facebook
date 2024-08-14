import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findAll() {
    const roles = await this.roleRepository.findAll();

    return {
      items: roles,
    };
  }

  async create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.create(createRoleDto);
  }

  async update(id: string, updateRoleDto: CreateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }
}
