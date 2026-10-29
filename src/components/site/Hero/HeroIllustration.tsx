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
          src="/brand/screens/live-hunt.webp"
          alt="Live hunt screen of the app: task progress, score and a map of the next locations"
          fill
          sizes="(max-width: 640px) 42vw, 252px"
          className={styles.screenshot}
          priority
        />
      </PhoneFrame>
      <PhoneFrame className={styles.discoveryPhone}>
        <Image
          src="/brand/screens/explore-hunts.webp"
          alt="Explore hunts screen of the app: a map of Prague with a hunt starting point nearby"
          fill
          sizes="(max-width: 640px) 42vw, 252px"
          className={styles.screenshot}
          priority
        />
      </PhoneFrame>
      <Image src="/brand/golem.svg" alt="" width={152} height={177} className={styles.golem} />
      <p className={styles.tag}>{tag}</p>
    </div>
  )
}
