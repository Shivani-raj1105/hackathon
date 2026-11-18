import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Bangers, Inter } from 'next/font/google'
import './globals.css'

const bangers = Bangers({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: 'HYPERION — 24-Hour Interdisciplinary Hackathon | SVCE Bengaluru',
  description:
    'HYPERION is a 24-hour interdisciplinary open innovation hackathon at Sri Venkateshwara College of Engineering (SVCE), Bengaluru. One campus. 24 hours. Unlimited possibilities.',
  generator: 'v0.app',
  icons: {
    icon: '/images/svce-logo.png',
    apple: '/images/svce-logo.png',
  },
  openGraph: {
    title: 'HYPERION — SVCE Bengaluru',
    description: 'One campus. 24 hours. Unlimited possibilities.',
    images: ['/images/cover-art.png'],
  },
}

export const viewport: Viewport = {
  themeColor: '#e8262c',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bangers.variable} ${inter.variable} bg-paper`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
