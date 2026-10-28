import { Logo } from '@/components/ui/Logo/Logo'
import { NavLink } from '@/components/ui/NavLink/NavLink'

import styles from './SiteHeader.module.css'

const navItems = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy', href: '/privacy' },
]

export function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <Logo />

      <nav aria-label="Main">
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.href}>
              <NavLink href={item.href}>{item.label}</NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
