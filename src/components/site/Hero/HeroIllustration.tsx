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
      <PhoneFrame className={styles.liveHuntPhone} />
      <PhoneFrame className={styles.discoveryPhone} />
      <Image src="/brand/golem.svg" alt="" width={152} height={177} className={styles.golem} />
      <p className={styles.tag}>{tag}</p>
    </div>
  )
}
