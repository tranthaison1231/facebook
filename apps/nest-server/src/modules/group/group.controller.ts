import { Controller, Get, Query } from '@nestjs/common';
import { GroupService } from './group.service';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAll() {
    return this.groupService.getAll();
  }

  @Get('/:id')
  async getById(@Query('id') groupId: string) {
    return this.groupService.getById(groupId);
  }
}
