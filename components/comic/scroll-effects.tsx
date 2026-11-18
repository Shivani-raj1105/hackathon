'use client'

import { useEffect } from 'react'

const REVEAL_DURATION_MS = 900

/**
 * Drives scroll-triggered reveals for `[data-reveal]` elements and light
 * parallax for `[data-parallax]` decorations. Content stays fully visible
 * without JavaScript or when the visitor prefers reduced motion.
 */
export function ScrollEffects({ active }: { active: boolean }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = document.documentElement

    document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
      const step = Number(group.dataset.stagger) || 90
      group.querySelectorAll<HTMLElement>(':scope > [data-reveal]').forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${i * step}ms`)
      })
    })
    root.setAttribute('data-reveal-ready', '')
    return () => root.removeAttribute('data-reveal-ready')
  }, [])

  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set<ReturnType<typeof setTimeout>>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          io.unobserve(el)
          el.setAttribute('data-revealed', '')
          const delay = Number.parseFloat(el.style.getPropertyValue('--reveal-delay')) || 0
          // Hand the element back to its own transitions (hover effects) once revealed.
          const t = setTimeout(() => {
            el.removeAttribute('data-reveal')
            el.removeAttribute('data-revealed')
            el.style.removeProperty('--reveal-delay')
            timers.delete(t)
          }, delay + REVEAL_DURATION_MS)
          timers.add(t)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el))

    const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let frame = 0
    const update = () => {
      frame = 0
      const mid = window.innerHeight / 2
      for (const el of parallax) {
        const anchor = el.parentElement ?? el
        const rect = anchor.getBoundingClientRect()
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) continue
        const speed = Number(el.dataset.parallax) || 0.1
        const offset = (rect.top + rect.height / 2 - mid) * -speed
        el.style.translate = `0 ${offset.toFixed(1)}px`
      }
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    if (parallax.length) {
      update()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll, { passive: true })
    }

    return () => {
      io.disconnect()
      timers.forEach(clearTimeout)
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [active])

  return null
}
