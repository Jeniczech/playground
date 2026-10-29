import styles from './Eyebrow.module.css'

type EyebrowProps = {
  className?: string
  children: React.ReactNode
}

export function Eyebrow({ className, children }: EyebrowProps) {
  return <p className={className ? `${styles.eyebrow} ${className}` : styles.eyebrow}>{children}</p>
}
