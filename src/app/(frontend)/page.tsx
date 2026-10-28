import { getPayload } from 'payload'

import { Hero } from '@/components/site/Hero/Hero'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const hero = await payload.findGlobal({ slug: 'hero' })

  return <Hero data={hero} />
}
