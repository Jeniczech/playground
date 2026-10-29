import Image from 'next/image'

import type { PragueExperience as PragueExperienceData } from '@/payload-types'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'
import { PhoneFrame } from '@/components/ui/PhoneFrame/PhoneFrame'

import styles from './PragueExperience.module.css'

const screens = {
  'explore-hunts': 'Explore hunts screen of the app: a map of Prague with a hunt starting point nearby',
  'live-hunt': 'Live hunt screen of the app: task progress, score and a map of the next locations',
}

type PragueExperienceProps = {
  data: PragueExperienceData
}

export function PragueExperience({ data }: PragueExperienceProps) {
  return (
    <section className={styles.pragueExperience} aria-labelledby="prague-experience-heading">
      <div className={styles.introduction}>
        <h2 id="prague-experience-heading" className={styles.title}>
          {data.title}
        </h2>

        <ul className={styles.features}>
          {data.features.map((feature, index) => (
            <li key={feature.id ?? index} className={styles.feature}>
              <span className={styles.featureIcon}>
                <Image src={`/brand/features/${feature.icon}.svg`} alt="" width={21} height={21} />
              </span>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>

      <section className={styles.preview} aria-labelledby="app-preview-heading">
        <div className={styles.previewIntroduction}>
          <Eyebrow>{data.galleryLabel}</Eyebrow>
          <h2 id="app-preview-heading" className={styles.previewHeading}>
            {data.galleryHeading}
          </h2>
        </div>

        <ul className={styles.gallery}>
          {data.screenshots.map((screenshot, index) => (
            <li key={screenshot.id ?? index}>
              <figure className={styles.screenshot}>
                <PhoneFrame className={styles.phone}>
                  {screenshot.screen && (
                    <Image
                      src={`/brand/screens/${screenshot.screen}.webp`}
                      alt={screens[screenshot.screen]}
                      fill
                      sizes="(max-width: 768px) 162px, 270px"
                      className={styles.screen}
                    />
                  )}
                </PhoneFrame>
                <figcaption className={styles.caption}>
                  <span className={styles.captionTitle}>{screenshot.title}</span>
                  <span className={styles.captionDescription}>{screenshot.description}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}
