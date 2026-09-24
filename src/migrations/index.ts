import * as migration_20260924_120216 from './20260924_120216';

export const migrations = [
  {
    up: migration_20260924_120216.up,
    down: migration_20260924_120216.down,
    name: '20260924_120216'
  },
];
