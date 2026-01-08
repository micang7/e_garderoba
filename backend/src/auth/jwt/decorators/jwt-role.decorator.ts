import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/common/enums/user-role.enum';

export const ROLES_KEY = 'roles';
export const Role = (role: UserRole) => SetMetadata(ROLES_KEY, role);
