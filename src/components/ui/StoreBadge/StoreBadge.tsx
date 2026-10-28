import Image from 'next/image'

import styles from './StoreBadge.module.css'

const stores = {
  'app-store': {
    icon: '/brand/app-store.svg',
    caption: 'Download on the',
    name: 'App Store',
  },
  'google-play': {
    icon: '/brand/google-play.svg',
    caption: 'Get it on',
    name: 'Google Play',
  },
}

type StoreBadgeProps = {
  store: keyof typeof stores
  href: string
}

export function StoreBadge({ store, href }: StoreBadgeProps) {
  const { icon, caption, name } = stores[store]

  return (
    <a href={href} className={styles.storeBadge} data-store={store}>
      <Image src={icon} alt="" width={24} height={27} className={styles.icon} />
      <span className={styles.label}>
        <span className={styles.caption}>{caption}</span>
        <span className={styles.name}>{name}</span>
      </span>
    </a>
  )
}
