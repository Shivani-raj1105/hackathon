import { AboutSection } from '@/components/comic/about-section'
import { ChallengeSection } from '@/components/comic/challenge-section'
import { ComicExperience } from '@/components/comic/comic-experience'
import { CountdownSection } from '@/components/comic/countdown-section'
import { DetailsSection } from '@/components/comic/details-section'
import { FaqSection } from '@/components/comic/faq-section'
import { HeroSection } from '@/components/comic/hero-section'
import { PrizesSection } from '@/components/comic/prizes-section'
import { RegisterSection } from '@/components/comic/register-section'
import { SiteFooter } from '@/components/comic/site-footer'
import { SiteHeader } from '@/components/comic/site-header'
import { TimelineSection } from '@/components/comic/timeline-section'

export default function Page() {
  return (
    <ComicExperience>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ChallengeSection />
        <DetailsSection />
        <TimelineSection />
        <CountdownSection />
        <PrizesSection />
        <FaqSection />
        <RegisterSection />
      </main>
      <SiteFooter />
    </ComicExperience>
  )
}
