import { getPayload } from 'payload'

import { Hero } from '@/components/site/Hero/Hero'
import { HowItWorks } from '@/components/site/HowItWorks/HowItWorks'
import { NextAdventure } from '@/components/site/NextAdventure/NextAdventure'
import { PragueExperience } from '@/components/site/PragueExperience/PragueExperience'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })
  const [hero, howItWorks, pragueExperience, nextAdventure] = await Promise.all([
    payload.findGlobal({ slug: 'hero' }),
    payload.findGlobal({ slug: 'how-it-works' }),
    payload.findGlobal({ slug: 'prague-experience' }),
    payload.findGlobal({ slug: 'next-adventure' }),
  ])

  return (
    <>
      <Hero data={hero} />
      <HowItWorks data={howItWorks} />
      <PragueExperience data={pragueExperience} />
      <NextAdventure data={nextAdventure} storeUrls={hero} />
    </>
  )
}
