import { siteConfig } from '@/lib/site-config'
import { RegisterButton } from './register-button'
import { Starburst } from './primitives'

export function RegisterSection() {
  const registrationOpen = Boolean(siteConfig.registrationOpensAt)

  return (
    <section id="register" className="sunburst relative scroll-mt-16 overflow-hidden border-y-[3px] border-ink">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <div data-reveal="pop" className="comic-shadow-lg relative border-4 border-ink bg-paper px-6 py-12 text-center sm:px-12">
          <Starburst
            parallax={0.1}
            className="animate-wobble -right-4 -top-10 size-28 text-2xl sm:size-32 sm:text-3xl"
            color="bg-comic-yellow"
          >
            JOIN IN!
          </Starburst>

          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-comic-red">
            Registration
          </p>
          <h2
            data-reveal="text"
            style={{ ['--reveal-delay' as string]: '250ms' }}
            className="mt-4 text-balance font-display text-5xl leading-[0.95] tracking-wide sm:text-7xl"
          >
            Your idea deserves{' '}
            <span className="text-outline text-comic-yellow">a chance.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed">
            Gather your team. Think differently. Build something meaningful. Be part of HYPERION.
          </p>

          <div
            data-reveal="up"
            style={{ ['--reveal-delay' as string]: '400ms' }}
            className="mt-8 flex flex-col items-center gap-4"
          >
            <RegisterButton />
            <p className="text-sm font-semibold text-ink/70">
              {registrationOpen
                ? 'Fill the registration form on the next page.'
                : 'The registration form will be available here once registration opens.'}
            </p>
          </div>

          <p className="mt-10 font-display text-2xl tracking-wide">
            {"BRING YOUR IDEAS. WE'LL PROVIDE THE STAGE."}
          </p>
        </div>
      </div>
    </section>
  )
}
