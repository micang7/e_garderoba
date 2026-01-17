export enum UserRole {
  DANCER = 'tancerz',
  MANAGER = 'kierownik',
  ADMIN = 'administrator',
}

export const RolePriority: Record<UserRole, number> = {
  [UserRole.DANCER]: 1,
  [UserRole.MANAGER]: 2,
  [UserRole.ADMIN]: 3,
};
