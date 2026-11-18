import { Handshake, Lightbulb, Rocket, Wrench } from 'lucide-react'
import { SectionHeading } from './primitives'

const panels = [
  {
    step: 'Panel 1 · Ideation',
    title: 'A question sparks',
    text: 'Spot a real-world challenge and ask: what if?',
    icon: Lightbulb,
    tone: 'bg-comic-yellow',
    sfx: 'ZING!',
  },
  {
    step: 'Panel 2 · Collaboration',
    title: 'Minds unite',
    text: 'Mix disciplines, skills and viewpoints into one team.',
    icon: Handshake,
    tone: 'bg-comic-blue',
    sfx: 'TEAM UP!',
  },
  {
    step: 'Panel 3 · Development',
    title: 'Build begins',
    text: 'Prototype, code, wire and test against the clock.',
    icon: Wrench,
    tone: 'bg-comic-red',
    sfx: 'CLANK!',
  },
  {
    step: 'Panel 4 · Innovation',
    title: 'Idea takes flight',
    text: 'Present a working solution that makes an impact.',
    icon: Rocket,
    tone: 'bg-comic-yellow',
    sfx: 'WHOOSH!',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 border-y-[3px] border-ink bg-paper-dark">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <SectionHeading kicker="Our story begins…" title="What's the" accent="story?" />
          <div data-reveal="right" className="comic-shadow relative border-[3px] border-ink bg-paper p-6">
            <span className="absolute -top-4 left-5 bg-ink px-3 py-1 text-xs font-extrabold uppercase tracking-[0.2em] text-comic-yellow">
              Narrator
            </span>
            <p className="text-pretty text-lg leading-relaxed">
              <strong>HYPERION</strong> is a 24-hour interdisciplinary innovation challenge at Sri Venkateshwara
              College of Engineering, Bengaluru. It encourages students to think beyond conventional disciplinary
              boundaries, collaborate with peers and develop creative solutions to real-world challenges.
            </p>
            <p className="mt-4 text-pretty leading-relaxed text-ink/80">
              Participants are free to explore ideas from any engineering or interdisciplinary domain. The focus is
              on innovation, collaboration, problem-solving and execution.
            </p>
          </div>
        </div>

        <ol data-stagger="120" className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {panels.map(({ step, title, text, icon: Icon, tone, sfx }, i) => (
            <li
              key={step}
              data-reveal="up"
              className={`comic-shadow group relative flex flex-col border-[3px] border-ink bg-paper transition-transform duration-200 hover:-translate-y-1 ${
                i % 2 ? 'lg:translate-y-6 lg:hover:translate-y-5' : ''
              }`}
            >
              <div className={`halftone-ink relative grid aspect-[4/3] place-items-center border-b-[3px] border-ink ${tone}`}>
                <span className="grid size-20 place-items-center rounded-full border-[3px] border-ink bg-paper transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                  <Icon className="size-10" aria-hidden="true" strokeWidth={2.25} />
                </span>
                <span
                  aria-hidden="true"
                  data-parallax="0.06"
                  className="text-outline-sm absolute right-3 top-3 rotate-6 font-display text-2xl tracking-wide text-paper"
                >
                  {sfx}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-comic-red">{step}</p>
                <h3 className="font-display text-3xl tracking-wide">{title}</h3>
                <p className="leading-relaxed text-ink/80">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
