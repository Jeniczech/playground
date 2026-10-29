import Image from 'next/image'

import type { Hero as HeroData, NextAdventure as NextAdventureData } from '@/payload-types'
import { StoreBadges } from '@/components/ui/StoreBadges/StoreBadges'

import styles from './NextAdventure.module.css'

type NextAdventureProps = {
  data: NextAdventureData
  storeUrls: Pick<HeroData, 'appStoreUrl' | 'googlePlayUrl'>
}

export function NextAdventure({ data, storeUrls }: NextAdventureProps) {
  return (
    <section className={styles.nextAdventure} aria-labelledby="next-adventure-heading">
      <div className={styles.guideAndDownload}>
        <div className={styles.guide}>
          <Image src="/brand/golem.svg" alt="" width={158} height={184} className={styles.golem} />
          <div className={styles.guideIntroduction}>
            <h2 className={styles.guideHeading}>{data.guideHeading}</h2>
            <p className={styles.guideDescription}>{data.guideDescription}</p>
          </div>
        </div>

        <div className={styles.download}>
          <h2 id="next-adventure-heading" className={styles.heading}>
            {data.heading}
          </h2>
          <p className={styles.description}>{data.description}</p>
          <StoreBadges
            appStoreUrl={storeUrls.appStoreUrl}
            googlePlayUrl={storeUrls.googlePlayUrl}
            stretchOnMobile
          />
        </div>
      </div>

      <div id="contact" className={styles.contact}>
        <h2 className={styles.contactHeading}>{data.contactHeading}</h2>
        <a href={`mailto:${data.contactEmail}`} className={styles.contactEmail}>
          {data.contactEmail}
        </a>
      </div>
    </section>
  )
}
