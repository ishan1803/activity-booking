import { Role, RoleType } from './Role.model';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}

export class UserHelper {
  static hasRole(user: User, role: string): boolean {
    const userRoles = RoleType.extractRoles(user.roles);
    return userRoles.includes(role);
  }
}
