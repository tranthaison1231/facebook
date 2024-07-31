import { Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async getAll() {
    return this.groupRepository.getAll();
  }

  async getById(groupId: string) {
    return this.groupRepository.getById(groupId);
  }
}
