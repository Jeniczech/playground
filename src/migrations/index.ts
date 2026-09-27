import * as migration_20260924_120216 from './20260924_120216';
import * as migration_20260927_133638_add_user_roles from './20260927_133638_add_user_roles';

export const migrations = [
  {
    up: migration_20260924_120216.up,
    down: migration_20260924_120216.down,
    name: '20260924_120216',
  },
  {
    up: migration_20260927_133638_add_user_roles.up,
    down: migration_20260927_133638_add_user_roles.down,
    name: '20260927_133638_add_user_roles'
  },
];
