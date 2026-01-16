export enum UserRole {
  Dancer = 'tancerz',
  Manager = 'kierownik',
  Admin = 'administrator',
}

export const RolePriority: Record<UserRole, number> = {
  [UserRole.Dancer]: 1,
  [UserRole.Manager]: 2,
  [UserRole.Admin]: 3,
};
