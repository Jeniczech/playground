import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "hero" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"app_store_url" varchar NOT NULL,
  	"google_play_url" varchar NOT NULL,
  	"note" varchar NOT NULL,
  	"tag" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)

  await payload.updateGlobal({
    slug: 'hero',
    data: {
      eyebrow: 'The city is your playing field',
      heading: 'Discover Prague differently',
      description:
        'Explore the city through location-based scavenger hunts, hidden details and challenges inspired by Prague’s streets, landmarks and stories.',
      appStoreUrl: '#',
      googlePlayUrl: '#',
      note: 'Made for curious minds. Played on foot.',
      tag: 'Real streets. Hidden stories.',
    },
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "hero" CASCADE;`)
}
