import Link from 'next/link'

import styles from './NavLink.module.css'

type NavLinkProps = {
  href: string
  weight?: 'semibold' | 'regular'
  children: React.ReactNode
}

export function NavLink({ href, weight = 'semibold', children }: NavLinkProps) {
  return (
    <Link href={href} className={styles.navLink} data-weight={weight}>
      {children}
    </Link>
  )
}
