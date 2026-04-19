import { integrations } from '../config/content'
import { cn } from '../lib/cn'

type Size = 'sm' | 'md'

interface Props {
  size?: Size
  className?: string
  /** If provided, overrides the default gap in rem (Tailwind spacing scale). */
  gapClassName?: string
}

/**
 * Seamless CSS-only infinite logo marquee.
 * Doubles the logo list and translates 0 → -50% so the second copy lines up
 * with the starting position. Pauses on hover. Edges fade via mask-image.
 */
export function LogoMarquee({ size = 'md', className, gapClassName }: Props) {
  const loop = [...integrations.logos, ...integrations.logos]

  const heightClass =
    size === 'sm' ? 'h-6 sm:h-7' : 'h-10 sm:h-12'
  const maxWidthClass =
    size === 'sm' ? 'max-w-[80px] sm:max-w-[90px]' : 'max-w-[140px]'
  const gap = gapClassName ?? (size === 'sm' ? 'gap-8 sm:gap-10' : 'gap-10 sm:gap-14')

  return (
    <div className={cn('relative w-full overflow-hidden mask-fade-x', className)}>
      <div className={cn('marquee-track flex w-max items-center', gap)}>
        {loop.map((logo, i) => (
          <div
            key={`${logo.file}-${i}`}
            className={cn('flex shrink-0 items-center justify-center', heightClass)}
            aria-hidden={i >= integrations.logos.length ? true : undefined}
          >
            <img
              src={`/company-logos/${logo.file}`}
              alt={i < integrations.logos.length ? logo.name : ''}
              className={cn(
                'h-full w-auto select-none object-contain',
                maxWidthClass
              )}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
