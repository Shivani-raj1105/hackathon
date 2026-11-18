import { Bot, Brain, Cog, Code, Cpu, Leaf, PenTool, Zap } from 'lucide-react'
import { SectionHeading } from './primitives'

const domains = [
  { label: 'Mechanical', icon: Cog, tone: 'bg-comic-yellow' },
  { label: 'Electrical', icon: Zap, tone: 'bg-comic-blue' },
  { label: 'Electronics', icon: Cpu, tone: 'bg-comic-red text-paper' },
  { label: 'Computer Science', icon: Code, tone: 'bg-paper' },
  { label: 'Artificial Intelligence', icon: Brain, tone: 'bg-comic-blue' },
  { label: 'Robotics', icon: Bot, tone: 'bg-comic-yellow' },
  { label: 'Sustainability', icon: Leaf, tone: 'bg-paper' },
  { label: 'Design', icon: PenTool, tone: 'bg-comic-red text-paper' },
]

export function ChallengeSection() {
  return (
    <section id="challenge" className="sunburst relative scroll-mt-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div data-reveal="up" className="comic-shadow-lg border-4 border-ink bg-paper p-6 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <SectionHeading kicker="The Challenge · Open Innovation" title="No fixed tracks." accent="No limits to ideas." />
            <p data-reveal="right" style={{ ['--reveal-delay' as string]: '250ms' }} className="text-pretty text-lg leading-relaxed text-ink/85">
              Think beyond boundaries. Whether your idea involves mechanical engineering, electronics, computer
              science, sustainability, automation, design or a combination of disciplines, this is your
              opportunity to explore it.
            </p>
          </div>

          <p className="mt-10 inline-block bg-ink px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-comic-yellow">
            Example domains — for inspiration only, not mandatory tracks
          </p>

          <ul data-stagger="70" className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {domains.map(({ label, icon: Icon, tone }, i) => (
              <li
                key={label}
                data-reveal="pop"
                className={`comic-shadow-sm flex flex-col items-start gap-3 border-[3px] border-ink p-4 transition-transform duration-200 hover:-translate-y-1 hover:rotate-0 ${tone} ${
                  i % 2 ? 'rotate-1' : '-rotate-1'
                }`}
              >
                <Icon className="size-7" aria-hidden="true" strokeWidth={2.25} />
                <span className="font-display text-xl leading-tight tracking-wide sm:text-2xl">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex justify-center">
            <div
              data-reveal="bubble"
              className="speech-bubble -rotate-2 bg-comic-yellow px-8 py-4"
              style={{ ['--tail-x' as string]: '45%' }}
            >
              <p className="font-display text-3xl tracking-wide sm:text-4xl">DIFFERENT MINDS. ONE SOLUTION.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
