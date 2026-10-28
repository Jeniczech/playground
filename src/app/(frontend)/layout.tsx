import React from 'react'
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google'

import { SiteHeader } from '@/components/site/SiteHeader/SiteHeader'
import './styles.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-instrument-serif',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-plus-jakarta-sans',
})

export const metadata = {
  description: 'Explore Prague with the Prague Scavenger Hunt mobile app.',
  title: 'Prague Scavenger Hunt',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${plusJakartaSans.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
      </body>
    </html>
  )
}
