import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_prague_experience_features_icon" AS ENUM('eye', 'flag', 'key', 'diamond');
  CREATE TABLE "prague_experience_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_prague_experience_features_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "prague_experience_screenshots" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "prague_experience" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"gallery_label" varchar NOT NULL,
  	"gallery_heading" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "prague_experience_features" ADD CONSTRAINT "prague_experience_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prague_experience"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "prague_experience_screenshots" ADD CONSTRAINT "prague_experience_screenshots_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."prague_experience"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "prague_experience_features_order_idx" ON "prague_experience_features" USING btree ("_order");
  CREATE INDEX "prague_experience_features_parent_id_idx" ON "prague_experience_features" USING btree ("_parent_id");
  CREATE INDEX "prague_experience_screenshots_order_idx" ON "prague_experience_screenshots" USING btree ("_order");
  CREATE INDEX "prague_experience_screenshots_parent_id_idx" ON "prague_experience_screenshots" USING btree ("_parent_id");`)

  await payload.updateGlobal({
    slug: 'prague-experience',
    data: {
      title: 'There’s more to Prague than meets the eye.',
      features: [
        {
          icon: 'eye',
          title: 'Explore hidden Prague',
          description: 'Discover details and places you might normally walk past.',
        },
        {
          icon: 'flag',
          title: 'Location-based challenges',
          description: 'Tasks unlock when you reach the right place.',
        },
        {
          icon: 'key',
          title: 'One chance to answer',
          description: 'Each task has one correct answer and one attempt.',
        },
        {
          icon: 'diamond',
          title: 'Compete on leaderboards',
          description: 'Earn points and compare your results with other players.',
        },
      ],
      galleryLabel: 'A glimpse inside the app',
      galleryHeading: 'From the first clue to the final point.',
      screenshots: [
        { title: 'Find your adventure', description: 'Discover a hunt near you' },
        { title: 'Follow your curiosity', description: 'Walk to the next checkpoint' },
        { title: 'Look a little closer', description: 'Solve a challenge on location' },
        { title: 'Make your mark', description: 'Finish your hunt and see your rank' },
      ],
    },
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "prague_experience_features" CASCADE;
  DROP TABLE "prague_experience_screenshots" CASCADE;
  DROP TABLE "prague_experience" CASCADE;
  DROP TYPE "public"."enum_prague_experience_features_icon";`)
}
