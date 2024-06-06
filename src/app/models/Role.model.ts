export interface Role {
  id: number;
  role: string;
}

export class RoleType {
  static CUSTOMER = 'CUSTOMER';
  static EXPERT = 'EXPERT';
  static ADMIN = 'ADMIN';

  static extractRoles(roles: Role[]): string[] {
    return roles.map(role => role.role);
  }
}
