import { easeOutBack, easeOutExpo, easeInOutCubic, progress } from '@/lib/motion'
import { Reveal, SceneShell } from '../primitives'
import type { SceneProps } from '../types'

const ORANGE = '#ff7a00'

export function IntroScene({ t, duration }: SceneProps) {
  const orb = easeOutBack(progress(t, 0.15, 1.2))
  const ring = easeInOutCubic(progress(t, 0.8, 1.3))
  const ringLength = 2 * Math.PI * 330
  const letters = 'ZO7AL'.split('')

  return (
    <SceneShell t={t} duration={duration} accent={ORANGE} glowPosition="50% 42%">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative flex h-[300px] w-[760px] items-center justify-center">
          <svg aria-hidden="true" viewBox="-380 -150 760 300" className="absolute inset-0 h-full w-full">
            <ellipse
              cx="0"
              cy="0"
              rx="330"
              ry="70"
              fill="none"
              stroke={ORANGE}
              strokeOpacity="0.7"
              strokeWidth="3"
              strokeDasharray={ringLength}
              strokeDashoffset={ringLength * (1 - ring)}
              transform={`rotate(-12) scale(${0.9 + 0.1 * ring})`}
            />
          </svg>
          <div
            className="relative h-[170px] w-[170px] rounded-full"
            style={{
              transform: `scale(${orb})`,
              background: 'radial-gradient(circle at 35% 30%, #ffb46a, #ff7a00 55%, #c24e00)',
              boxShadow: `0 0 ${90 + Math.sin(t * 3) * 20}px rgba(255,122,0,0.55), 0 0 220px rgba(255,122,0,0.25)`,
            }}
          />
        </div>

        <div dir="ltr" className="mt-10 flex text-[150px] font-bold leading-none tracking-tight text-white">
          {letters.map((letter, i) => {
            const p = easeOutExpo(progress(t, 1.9 + i * 0.09, 0.9))
            return (
              <span
                key={i}
                className="inline-block"
                style={{
                  opacity: p,
                  transform: `translateY(${(1 - p) * 90}px) rotate(${(1 - p) * 8}deg)`,
                  filter: `blur(${(1 - p) * 12}px)`,
                  color: letter === '7' ? ORANGE : undefined,
                }}
              >
                {letter}
              </span>
            )
          })}
        </div>

        <Reveal t={t} at={2.7} className="mt-8 text-[34px] text-[#8f96a3]">
          <span dir="ltr">@iiZo7al</span> — عالم زحل الترفيهي
        </Reveal>
      </div>
    </SceneShell>
  )
}

const HEADLINE = [
  { word: 'ابنِ.', at: 0.3 },
  { word: 'العب.', at: 0.95 },
  { word: 'أبدع.', at: 1.6 },
]

export function HeadlineScene({ t, duration }: SceneProps) {
  return (
    <SceneShell t={t} duration={duration} accent={ORANGE} glowPosition="50% 55%">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="flex items-baseline gap-14 text-[210px] font-bold leading-[1.1] text-white">
          {HEADLINE.map(({ word, at }, i) => {
            const p = easeOutExpo(progress(t, at, 0.75))
            const isLast = i === HEADLINE.length - 1
            return (
              <span
                key={word}
                className="inline-block"
                style={{
                  opacity: p,
                  transform: `scale(${1.6 - 0.6 * p})`,
                  filter: `blur(${(1 - p) * 18}px)`,
                  color: isLast ? 'transparent' : undefined,
                  backgroundImage: isLast ? 'linear-gradient(120deg, #ffc94a, #ff7a00 60%, #ff4d00)' : undefined,
                  backgroundClip: isLast ? 'text' : undefined,
                  WebkitBackgroundClip: isLast ? 'text' : undefined,
                }}
              >
                {word}
              </span>
            )
          })}
        </div>
        <Reveal t={t} at={2.4} className="mt-10 max-w-[1300px] text-center text-[40px] leading-relaxed text-[#c9ced6]">
          سيرفرات ماينكرافت، مابات فورتنايت، مودباكات، ومشاريع ألعاب من زحل.
        </Reveal>
        <Reveal t={t} at={2.9} className="mt-8 text-[22px] font-semibold tracking-[0.4em] text-[#8f96a3]">
          <span dir="ltr">BUILD · PLAY · CREATE</span>
        </Reveal>
      </div>
    </SceneShell>
  )
}
