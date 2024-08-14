import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { User } from '@prisma/client';

export enum Permission {
  ManagePermission = 'manage-permission',
}

interface RequestWithUser extends Request {
  user: User & {
    userRoles: {
      role: { rolePermissions: { permission: { name: Permission } }[] };
    }[];
  };
}

const PermissionGuard = (requiredPermission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      const permissions = [
        ...new Set(
          user.userRoles
            .map((userRole) =>
              userRole.role.rolePermissions.map(
                (rolePermission) => rolePermission.permission.name,
              ),
            )
            .flat(),
        ),
      ];

      return permissions.includes(requiredPermission);
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
