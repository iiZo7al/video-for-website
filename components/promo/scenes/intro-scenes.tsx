'use client'

import dynamic from 'next/dynamic'
import { easeOutExpo, progress } from '@/lib/motion'
import { useCopy } from '../copy'
import { Reveal, SceneShell } from '../primitives'
import type { SceneProps } from '../types'

const ORANGE = '#ff7a00'
const Saturn3D = dynamic(() => import('../saturn-3d'), { ssr: false })

// Same word cycle and colors as the hero typewriter on zo7al.is-a.dev.
const WORDS = [
  { text: 'NETWORK', color: '#ff7a00' },
  { text: 'GAMES', color: '#19d9ff' },
  { text: 'MAPS', color: '#8b5cf6' },
  { text: 'MODPACKS', color: '#2be37b' },
  { text: 'PROJECTS', color: '#ff7a00' },
]
const TYPE_START = 2.2
const TYPE_CHAR = 0.045
const HOLD = 0.22
const ERASE_CHAR = 0.025

function typewriterFrame(t: number) {
  let cursor = TYPE_START
  for (let i = 0; i < WORDS.length; i++) {
    const word = WORDS[i]
    const isLast = i === WORDS.length - 1
    const typeEnd = cursor + word.text.length * TYPE_CHAR
    if (t < typeEnd) {
      const count = Math.max(0, Math.floor((t - cursor) / TYPE_CHAR))
      return { text: word.text.slice(0, count), color: word.color, done: false }
    }
    if (isLast) return { text: word.text, color: word.color, done: true }
    const holdEnd = typeEnd + HOLD
    if (t < holdEnd) return { text: word.text, color: word.color, done: false }
    const eraseEnd = holdEnd + word.text.length * ERASE_CHAR
    if (t < eraseEnd) {
      const erased = Math.floor((t - holdEnd) / ERASE_CHAR)
      return { text: word.text.slice(0, word.text.length - erased), color: word.color, done: false }
    }
    cursor = eraseEnd
  }
  return { text: '', color: ORANGE, done: false }
}

export function IntroScene({ t, duration }: SceneProps) {
  const copy = useCopy()
  const brand = easeOutExpo(progress(t, 1.5, 0.9))
  const frame = typewriterFrame(t)
  const caretOn = !frame.done || Math.floor(t * 2.4) % 2 === 0
  const typing = t >= TYPE_START - 0.3

  return (
    <SceneShell t={t} duration={duration} accent={ORANGE} glowPosition="50% 50%">
      <div className="absolute inset-0">
        <Saturn3D t={t} />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <div
          dir="ltr"
          className="flex flex-col items-center text-[150px] font-bold leading-[1.05] tracking-tight"
          style={{ textShadow: '0 8px 50px rgba(0,0,0,0.75)' }}
        >
          <span
            className="text-white"
            style={{
              opacity: brand,
              transform: `translateY(${(1 - brand) * 60}px)`,
              filter: `blur(${(1 - brand) * 12}px)`,
            }}
          >
            ZO7AL
          </span>
          <span className="inline-grid" style={{ color: frame.color, opacity: typing ? 1 : 0 }}>
            <span className="invisible col-start-1 row-start-1">MODPACKS</span>
            <span className="col-start-1 row-start-1">
              {frame.text}
              <span
                className="ms-[0.035em] inline-block h-[0.82em] w-[0.028em] align-[-0.045em]"
                style={{ background: 'currentColor', opacity: caretOn && !frame.done ? 1 : 0 }}
              />
            </span>
          </span>
        </div>

        <Reveal
          t={t}
          at={3.4}
          className="mt-10 max-w-[1200px] text-balance text-[38px] leading-relaxed text-[#c9ced6]"
          style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}
        >
          {copy.subtitle}
        </Reveal>
      </div>
    </SceneShell>
  )
}
