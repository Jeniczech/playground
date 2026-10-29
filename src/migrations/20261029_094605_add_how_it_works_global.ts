import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_how_it_works_steps_icon" AS ENUM('flag', 'map', 'question');
  CREATE TABLE "how_it_works_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_how_it_works_steps_icon" NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "how_it_works" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "how_it_works_steps" ADD CONSTRAINT "how_it_works_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "how_it_works_steps_order_idx" ON "how_it_works_steps" USING btree ("_order");
  CREATE INDEX "how_it_works_steps_parent_id_idx" ON "how_it_works_steps" USING btree ("_parent_id");`)

  await payload.updateGlobal({
    slug: 'how-it-works',
    data: {
      title: 'How it works',
      label: 'A little curiosity goes a long way',
      steps: [
        {
          icon: 'flag',
          title: 'Choose a hunt',
          description: 'Pick an adventure and head to its starting location.',
        },
        {
          icon: 'map',
          title: 'Explore Prague',
          description: 'Follow the map and reach checkpoints around the city.',
        },
        {
          icon: 'question',
          title: 'Solve the challenges',
          description: 'Unlock tasks on location, answer questions and earn points.',
        },
      ],
    },
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "how_it_works_steps" CASCADE;
  DROP TABLE "how_it_works" CASCADE;
  DROP TYPE "public"."enum_how_it_works_steps_icon";`)
}
