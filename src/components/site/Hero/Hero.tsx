import Image from 'next/image'

import type { Hero as HeroData } from '@/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { StoreBadges } from '@/components/ui/StoreBadges/StoreBadges'

import { HeroIllustration } from './HeroIllustration'
import styles from './Hero.module.css'

type HeroProps = {
  data: HeroData
}

export function Hero({ data }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.content}>
        <Eyebrow>{data.eyebrow}</Eyebrow>
        <h1 id="hero-heading" className={styles.heading}>
          {data.heading}
        </h1>
        <p className={styles.description}>{data.description}</p>

        <StoreBadges appStoreUrl={data.appStoreUrl} googlePlayUrl={data.googlePlayUrl} />

        <p className={styles.note}>
          <Image src="/brand/footprints.svg" alt="" width={18} height={18} />
          {data.note}
        </p>

        <ButtonLink href="#how-it-works">How it works ↓</ButtonLink>
      </div>

      <HeroIllustration tag={data.tag} />
    </section>
  )
}
