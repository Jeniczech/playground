import type { Metadata } from 'next'
import React from 'react'
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google'

import { SiteFooter } from '@/components/site/SiteFooter/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader/SiteHeader'
import { siteName, siteUrl } from '@/site'
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

const title = 'Prague Scavenger Hunt – Self-Guided City Game App'
const description =
  'Discover hidden Prague with a location-based scavenger hunt. Solve clues at real landmarks, compete on leaderboards, and explore at your own pace.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: siteName,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName,
    title,
    description,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${plusJakartaSans.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
