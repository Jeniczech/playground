import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Hero } from './globals/Hero'
import { HowItWorks } from './globals/HowItWorks'
import { NextAdventure } from './globals/NextAdventure'
import { PragueExperience } from './globals/PragueExperience'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const serverURL = process.env.SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users],
  globals: [Hero, HowItWorks, PragueExperience, NextAdventure],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Dev databases are built by migrations too, so they get the seeded content and never
    // lose rows to a schema push.
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
  endpoints: [
    {
      path: '/health',
      method: 'get',
      handler: async (req) => {
        try {
          await req.payload.find({
            collection: 'users',
            limit: 1,
          })

          return Response.json({
            status: 'ok',
          })
        } catch {
          return Response.json(
            {
              status: 'error',
            },
            {
              status: 503,
            },
          )
        }
      },
    },
  ],
  email: nodemailerAdapter({
    defaultFromAddress: 'info@praguescavengerhunt.cz',
    defaultFromName: 'Prague Scavenger Hunt',
    skipVerify: process.env.NODE_ENV !== 'production',
    transportOptions: {
      host: 'smtp.forpsi.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    },
  }),
  serverURL,
  cors: [serverURL],
  csrf: [serverURL],
})
