import Image from 'next/image'

import type { Hero as HeroData } from '@/payload-types'
import { ButtonLink } from '@/components/ui/ButtonLink/ButtonLink'
import { StoreBadge } from '@/components/ui/StoreBadge/StoreBadge'

import { HeroIllustration } from './HeroIllustration'
import styles from './Hero.module.css'

type HeroProps = {
  data: HeroData
}

export function Hero({ data }: HeroProps) {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.content}>
        <p className={styles.eyebrow}>{data.eyebrow}</p>
        <h1 id="hero-heading" className={styles.heading}>
          {data.heading}
        </h1>
        <p className={styles.description}>{data.description}</p>

        <ul className={styles.storeBadges} aria-label="Download the app">
          <li>
            <StoreBadge store="app-store" href={data.appStoreUrl} />
          </li>
          <li>
            <StoreBadge store="google-play" href={data.googlePlayUrl} />
          </li>
        </ul>

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
