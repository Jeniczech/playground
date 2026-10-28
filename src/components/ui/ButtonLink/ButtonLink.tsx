import Link from 'next/link'

import styles from './ButtonLink.module.css'

type ButtonLinkProps = {
  href: string
  children: React.ReactNode
}

export function ButtonLink({ href, children }: ButtonLinkProps) {
  return (
    <Link href={href} className={styles.buttonLink}>
      {children}
    </Link>
  )
}
