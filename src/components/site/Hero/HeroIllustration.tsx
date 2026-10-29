import Image from 'next/image'

import { PhoneFrame } from '@/components/ui/PhoneFrame/PhoneFrame'

import styles from './HeroIllustration.module.css'

type HeroIllustrationProps = {
  tag: string
}

export function HeroIllustration({ tag }: HeroIllustrationProps) {
  return (
    <div className={styles.stage}>
      <div className={styles.halo} />
      <Image
        src="/brand/wandering-route.png"
        alt=""
        width={500}
        height={561}
        className={styles.route}
        priority
      />
      <PhoneFrame className={styles.liveHuntPhone}>
        <Image
          src="/brand/screens/home.webp"
          alt="Home screen of the app: choose your adventure and the top three players on the leaderboard"
          fill
          sizes="(max-width: 640px) 42vw, 252px"
          className={styles.screen}
          priority
        />
      </PhoneFrame>
      <PhoneFrame className={styles.discoveryPhone}>
        <Image
          src="/brand/screens/hunt-detail.webp"
          alt="Hunt detail screen of the app: Shadows of Old Prague with its duration, distance, tasks and places to discover"
          fill
          sizes="(max-width: 640px) 42vw, 252px"
          className={styles.screen}
          priority
        />
      </PhoneFrame>
      <Image src="/brand/golem.svg" alt="" width={152} height={177} className={styles.golem} />
      <p className={styles.tag}>{tag}</p>
    </div>
  )
}
