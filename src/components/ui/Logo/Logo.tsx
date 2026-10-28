import Image from 'next/image'
import Link from 'next/link'

import styles from './Logo.module.css'

export function Logo() {
  return (
    <Link href="/" className={styles.logo} aria-label="Prague Scavenger Hunt – home">
      <Image src="/brand/emblem.svg" alt="" width={44} height={44} className={styles.emblem} priority />
      <span className={styles.wordmark}>
        <span>Prague</span>
        <span>Scavenger Hunt</span>
      </span>
    </Link>
  )
}
