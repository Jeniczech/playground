import * as migration_20260924_120216 from './20260924_120216';
import * as migration_20260927_133638_add_user_roles from './20260927_133638_add_user_roles';
import * as migration_20261028_220745_remove_posts_and_media from './20261028_220745_remove_posts_and_media';
import * as migration_20261028_224257_add_hero_global from './20261028_224257_add_hero_global';
import * as migration_20261029_094605_add_how_it_works_global from './20261029_094605_add_how_it_works_global';
import * as migration_20261029_100011_add_prague_experience_global from './20261029_100011_add_prague_experience_global';
import * as migration_20261029_101726_add_next_adventure_global from './20261029_101726_add_next_adventure_global';
import * as migration_20261029_115659_add_experience_screens from './20261029_115659_add_experience_screens';

export const migrations = [
  {
    up: migration_20260924_120216.up,
    down: migration_20260924_120216.down,
    name: '20260924_120216',
  },
  {
    up: migration_20260927_133638_add_user_roles.up,
    down: migration_20260927_133638_add_user_roles.down,
    name: '20260927_133638_add_user_roles',
  },
  {
    up: migration_20261028_220745_remove_posts_and_media.up,
    down: migration_20261028_220745_remove_posts_and_media.down,
    name: '20261028_220745_remove_posts_and_media',
  },
  {
    up: migration_20261028_224257_add_hero_global.up,
    down: migration_20261028_224257_add_hero_global.down,
    name: '20261028_224257_add_hero_global',
  },
  {
    up: migration_20261029_094605_add_how_it_works_global.up,
    down: migration_20261029_094605_add_how_it_works_global.down,
    name: '20261029_094605_add_how_it_works_global',
  },
  {
    up: migration_20261029_100011_add_prague_experience_global.up,
    down: migration_20261029_100011_add_prague_experience_global.down,
    name: '20261029_100011_add_prague_experience_global',
  },
  {
    up: migration_20261029_101726_add_next_adventure_global.up,
    down: migration_20261029_101726_add_next_adventure_global.down,
    name: '20261029_101726_add_next_adventure_global',
  },
  {
    up: migration_20261029_115659_add_experience_screens.up,
    down: migration_20261029_115659_add_experience_screens.down,
    name: '20261029_115659_add_experience_screens'
  },
];
