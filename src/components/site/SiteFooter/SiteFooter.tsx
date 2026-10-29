import { Logo } from '@/components/ui/Logo/Logo'
import { NavLink } from '@/components/ui/NavLink/NavLink'

import styles from './SiteFooter.module.css'

const footerLinks = [
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.navigation}>
        <Logo />

        <nav aria-label="Footer">
          <ul className={styles.links}>
            {footerLinks.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} weight="regular">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className={styles.copyright}>© Prague Scavenger Hunt</p>
    </footer>
  )
}
