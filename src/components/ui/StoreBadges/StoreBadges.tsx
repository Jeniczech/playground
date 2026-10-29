import { StoreBadge } from '@/components/ui/StoreBadge/StoreBadge'

import styles from './StoreBadges.module.css'

type StoreBadgesProps = {
  appStoreUrl: string
  googlePlayUrl: string
  stretchOnMobile?: boolean
}

export function StoreBadges({ appStoreUrl, googlePlayUrl, stretchOnMobile = false }: StoreBadgesProps) {
  return (
    <ul className={styles.storeBadges} data-stretch={stretchOnMobile || undefined} aria-label="Download the app">
      <li>
        <StoreBadge store="app-store" href={appStoreUrl} />
      </li>
      <li>
        <StoreBadge store="google-play" href={googlePlayUrl} />
      </li>
    </ul>
  )
}
