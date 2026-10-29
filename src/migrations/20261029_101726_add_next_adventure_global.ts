import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "next_adventure" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"guide_heading" varchar NOT NULL,
  	"guide_description" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"contact_heading" varchar NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  `)

  await payload.updateGlobal({
    slug: 'next-adventure',
    data: {
      guideHeading: 'Your guide through hidden Prague',
      guideDescription:
        'Meet Golem. Follow his clues and discover the stories hiding in the city around you.',
      heading: 'Ready to explore Prague?',
      description: 'Your next adventure starts with a walk.',
      contactHeading: 'Questions or feedback?',
      contactEmail: 'hello@praguescavengerhunt.cz',
    },
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "next_adventure" CASCADE;`)
}
