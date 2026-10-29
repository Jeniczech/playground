import Image from 'next/image'

import type { HowItWork as HowItWorksData } from '@/payload-types'
import { Eyebrow } from '@/components/ui/Eyebrow/Eyebrow'

import styles from './HowItWorks.module.css'

type HowItWorksProps = {
  data: HowItWorksData
}

export function HowItWorks({ data }: HowItWorksProps) {
  return (
    <section id="how-it-works" className={styles.howItWorks} aria-labelledby="how-it-works-heading">
      <div className={styles.heading}>
        <h2 id="how-it-works-heading" className={styles.title}>
          {data.title}
        </h2>
        <Eyebrow className={styles.label}>{data.label}</Eyebrow>
      </div>

      <ol className={styles.steps}>
        {data.steps.map((step, index) => (
          <li key={step.id ?? index} className={styles.step}>
            <span className={styles.motif}>
              <Image src={`/brand/steps/${step.icon}.svg`} alt="" width={25} height={25} />
            </span>
            <h3 className={styles.stepTitle}>
              {index + 1}. {step.title}
            </h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
