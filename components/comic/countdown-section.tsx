'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/lib/site-config'
import { SectionHeading } from './primitives'

type Parts = { days: number; hours: number; minutes: number; seconds: number }

function diff(target: number, now: number): Parts {
  const ms = Math.max(0, target - now)
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  }
}

const units: { key: keyof Parts; label: string; tone: string }[] = [
  { key: 'days', label: 'Days', tone: 'bg-comic-yellow' },
  { key: 'hours', label: 'Hours', tone: 'bg-comic-blue' },
  { key: 'minutes', label: 'Minutes', tone: 'bg-paper' },
  { key: 'seconds', label: 'Seconds', tone: 'bg-comic-red text-paper' },
]

export function CountdownSection() {
  const target = siteConfig.eventStart ? new Date(siteConfig.eventStart).getTime() : null
  const validTarget = target !== null && !Number.isNaN(target) ? target : null
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    if (validTarget === null) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [validTarget])

  const parts = validTarget !== null && now !== null ? diff(validTarget, now) : null
  const started = validTarget !== null && now !== null && now >= validTarget

  let status = 'DATE TO BE ANNOUNCED'
  if (validTarget !== null) status = started ? 'THE HACKATHON IS LIVE!' : (siteConfig.eventDateLabel ?? 'UNTIL KICK-OFF')

  return (
    <section id="countdown" className="halftone scroll-mt-16">
      <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <SectionHeading kicker="Countdown" title="The clock is" accent="ticking!" className="items-center" />
        <ul data-stagger="90" className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-4" aria-live="off">
          {units.map(({ key, label, tone }, i) => (
            <li
              key={key}
              data-reveal="pop"
              className={`comic-shadow flex flex-col items-center gap-1 border-[3px] border-ink px-3 py-6 ${tone} ${
                i % 2 ? 'rotate-1' : '-rotate-1'
              }`}
            >
              <span className="font-display text-6xl tabular-nums leading-none tracking-wide sm:text-7xl">
                {parts ? String(parts[key]).padStart(2, '0') : '--'}
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[0.2em]">{label}</span>
            </li>
          ))}
        </ul>
        <p data-reveal="up" className="mt-10 inline-block -rotate-1 bg-ink px-6 py-3 font-display text-3xl tracking-wide text-comic-yellow">
          {status}
        </p>
      </div>
    </section>
  )
}
