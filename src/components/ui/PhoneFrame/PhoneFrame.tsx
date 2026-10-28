import styles from './PhoneFrame.module.css'

type PhoneFrameProps = {
  className?: string
  children?: React.ReactNode
}

export function PhoneFrame({ className, children }: PhoneFrameProps) {
  return (
    <div className={className ? `${styles.phoneFrame} ${className}` : styles.phoneFrame}>
      <div className={styles.screen}>{children}</div>
    </div>
  )
}
