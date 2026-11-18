import { siteConfig } from '@/lib/site-config'
import { SectionHeading } from './primitives'

const tones = ['bg-comic-yellow', 'bg-comic-blue', 'bg-comic-red text-paper']

export function TimelineSection() {
  const allTba = siteConfig.timeline.every((t) => !t.time)

  return (
    <section id="timeline" className="scroll-mt-16 border-y-[3px] border-ink bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading kicker="Timeline" title="The 24-hour" accent="mission" invert />
          {allTba ? (
            <p data-reveal="pop" className="w-fit -rotate-2 border-[3px] border-paper bg-comic-red px-4 py-2 font-display text-2xl tracking-wide">
              DETAILED SCHEDULE COMING SOON
            </p>
          ) : null}
        </div>

        <ol data-stagger="100" className="relative mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.timeline.map((item, i) => (
            <li
              key={item.title}
              data-reveal="up"
              className="group relative border-[3px] border-paper bg-paper p-6 text-ink shadow-[6px_6px_0_0_var(--comic-yellow)] transition-transform duration-200 hover:-translate-y-1"
            >
              <span
                className={`absolute -left-4 -top-5 grid size-12 place-items-center rounded-full border-[3px] border-ink font-display text-2xl ${tones[i % tones.length]}`}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <p className="pl-6 text-xs font-extrabold uppercase tracking-[0.2em] text-comic-red">
                {item.time ?? 'Time TBA'}
              </p>
              <h3 className="mt-3 font-display text-3xl tracking-wide">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-ink/80">{item.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
