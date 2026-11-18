import type { Metadata } from 'next'
import { SiteHeader } from '@/components/comic/site-header'
import { SiteFooter } from '@/components/comic/site-footer'

export const metadata: Metadata = {
  title: 'Register Your Team — HYPERION Hackathon | SVCE Bengaluru',
  description:
    'Register your team for HYPERION, the 24-hour interdisciplinary hackathon at SVCE Bengaluru. Team size 2–4. Open to all SVCE students.',
  openGraph: {
    title: 'Register for HYPERION — SVCE Bengaluru',
    description: 'Join the 24-hour interdisciplinary hackathon at SVCE Bengaluru.',
    images: ['/images/cover-art.png'],
  },
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  )
}
