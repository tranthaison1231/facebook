import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { GroupService } from './group.service';
import { TypeOfGroup } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAll() {
    return this.groupService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') groupId: string) {
    const group = await this.groupService.getById(groupId);

    if (!group) {
      throw new BadRequestException('Group not found');
    }

    const { members, ...restGroup } = group;

    const totalMember = group.members.length;

    if (group.type === TypeOfGroup.PRIVATE) {
      return {
        ...restGroup,
        totalMember,
      };
    }

    return {
      ...restGroup,
      members,
      totalMember,
    };
  }
}
