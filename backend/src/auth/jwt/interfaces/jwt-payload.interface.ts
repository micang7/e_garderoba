import { UserRole } from 'src/common/enums/user-role.enum';

export interface JwtPayload {
  id: number;
  email: string;
  role: UserRole;
}
