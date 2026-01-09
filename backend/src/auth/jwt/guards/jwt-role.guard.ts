import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, RolePriority } from '../../../common/enums/user-role.enum';
import { ROLES_KEY } from '../decorators/jwt-role.decorator';
import { NoPermissionException } from '../../../common/exceptions';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.getAllAndOverride<UserRole>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      throw new NoPermissionException();
    }

    const userRoleValue = RolePriority[user.role as UserRole] || 0;
    const requiredRoleValue = RolePriority[requiredRole];

    if (userRoleValue >= requiredRoleValue) {
      return true;
    }

    throw new NoPermissionException();
  }
}
