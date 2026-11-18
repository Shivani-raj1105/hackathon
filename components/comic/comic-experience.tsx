'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { IntroCover, type IntroPhase } from './intro-cover'
import { ScrollEffects } from './scroll-effects'

const TURN_FALLBACK_MS = 1600

/**
 * The homepage is always rendered underneath the fixed cover, at its final
 * responsive layout. The cover is only a transformed overlay, so turning the
 * page never resizes or repositions anything on the page below.
 */
export function ComicExperience({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>('cover')
  const fallback = useRef<ReturnType<typeof setTimeout>>(null)

  const finish = useCallback(() => {
    if (fallback.current) clearTimeout(fallback.current)
    setPhase('done')
  }, [])

  const open = useCallback(() => {
    setPhase('turning')
    fallback.current = setTimeout(finish, TURN_FALLBACK_MS)
  }, [finish])

  useEffect(() => {
    if (phase === 'done') {
      document.documentElement.removeAttribute('data-intro')
      document.getElementById('home')?.focus({ preventScroll: true })
      return
    }
    document.documentElement.setAttribute('data-intro', 'open')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') finish()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, finish])

  useEffect(() => () => {
    if (fallback.current) clearTimeout(fallback.current)
  }, [])

  return (
    <>
      <div inert={phase !== 'done'}>{children}</div>
      <ScrollEffects active={phase !== 'cover'} />
      {phase !== 'done' ? (
        <IntroCover phase={phase} onOpen={open} onSkip={finish} onTurned={finish} />
      ) : null}
    </>
  )
}
