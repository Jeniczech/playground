import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prague_experience_screenshots_screen" AS ENUM('explore-hunts', 'live-hunt');
  ALTER TABLE "prague_experience_screenshots" ADD COLUMN "screen" "enum_prague_experience_screenshots_screen";`)

  // Plain SQL instead of updateGlobal so captions edited in the admin are kept.
  await db.execute(sql`
   UPDATE "prague_experience_screenshots" SET "screen" = 'explore-hunts' WHERE "_order" = 1;
  UPDATE "prague_experience_screenshots" SET "screen" = 'live-hunt' WHERE "_order" = 2;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "prague_experience_screenshots" DROP COLUMN "screen";
  DROP TYPE "public"."enum_prague_experience_screenshots_screen";`)
}
