import {
  siDiscord,
  siInstagram,
  siKick,
  siSnapchat,
  siTiktok,
  siTwitch,
  siX,
  siYoutube,
} from 'simple-icons'
import { easeOutBack, easeOutExpo, progress } from '@/lib/motion'
import { BrandIcon } from '../brand-icon'
import { Eyebrow, Reveal, SceneShell, TitleWords } from '../primitives'
import type { SceneProps } from '../types'

const PURPLE = '#8b5cf6'
const CYAN = '#19d9ff'
const GOLD = '#ffc94a'

const ISLANDS = [
  { code: '0633-4212-9611', tag: 'قنص · منظور أول' },
  { code: '3325-4001-0926', tag: 'زون وورز · 16 لاعب' },
  { code: '4904-5829-1966', tag: 'الكل ضد الكل' },
  { code: '6387-4453-1682', tag: 'معركة 4 فرق' },
  { code: '2994-5126-9804', tag: '+100 أغنية' },
  { code: '4162-0323-5737', tag: 'Doomspire Brickbattle' },
]

export function FortniteScene({ t, duration }: SceneProps) {
  return (
    <SceneShell t={t} duration={duration} accent={PURPLE} glowPosition="75% 45%">
      <div className="flex h-full items-center justify-between gap-20 px-[150px]">
        <div className="max-w-[640px]">
          <Reveal t={t} at={0.2}>
            <Eyebrow accent={PURPLE}>فورتنايت كرييتف</Eyebrow>
          </Reveal>
          <TitleWords
            t={t}
            at={0.35}
            words={['كل', 'ماب', 'في', 'مكان', 'واحد']}
            accentIndex={1}
            accent={PURPLE}
            stagger={0.08}
            className="mt-8 text-[110px] font-bold leading-[1.1] text-white"
          />
          <Reveal t={t} at={1} className="mt-8 text-[36px] leading-relaxed text-[#c9ced6]">
            مابات وتجارب من صنع زحل — متزامنة مباشرة مع Fortnite.com
          </Reveal>
          <Reveal
            t={t}
            at={3.1}
            y={20}
            className="mt-12 inline-flex items-center gap-4 rounded-full border border-[#8b5cf6]/40 bg-[#8b5cf6]/15 px-8 py-4 text-[28px] font-semibold text-white"
          >
            كود صانع المحتوى:
            <span dir="ltr" className="text-[#19d9ff]">
              Zo7al
            </span>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 gap-6" style={{ perspective: '1600px' }}>
          {ISLANDS.map((island, i) => {
            const p = easeOutExpo(progress(t, 0.9 + i * 0.14, 0.9))
            return (
              <div
                key={island.code}
                className="w-[420px] rounded-[28px] border border-white/10 bg-[#11141b]/90 p-8"
                style={{
                  opacity: p,
                  transform: `rotateX(${(1 - p) * -70}deg) translateY(${(1 - p) * 60}px)`,
                  transformOrigin: 'top center',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.45)',
                }}
              >
                <div className="text-[20px] font-semibold text-[#8f96a3]">كود الماب</div>
                <div dir="ltr" className="mt-2 text-start font-mono text-[40px] font-bold text-white">
                  {island.code}
                </div>
                <div className="mt-4 inline-block rounded-full bg-[#8b5cf6]/20 px-5 py-2 text-[22px] text-[#c4b5fd]">
                  {island.tag}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </SceneShell>
  )
}

const SOCIALS = [siYoutube, siDiscord, siTiktok, siInstagram, siX, siTwitch, siKick, siSnapchat]

export function SocialsScene({ t, duration }: SceneProps) {
  const radiusX = 640
  const radiusY = 300
  return (
    <SceneShell t={t} duration={duration} accent={CYAN} glowPosition="50% 50%">
      <div className="relative flex h-full flex-col items-center justify-center text-center">
        {SOCIALS.map((icon, i) => {
          const p = easeOutBack(progress(t, 0.5 + i * 0.1, 0.8))
          const angle = (i / SOCIALS.length) * Math.PI * 2 + t * 0.25
          const x = Math.cos(angle) * radiusX
          const y = Math.sin(angle) * radiusY
          return (
            <div
              key={icon.slug}
              className="absolute flex h-[132px] w-[132px] items-center justify-center rounded-[34px] border border-white/10 bg-[#11141b]/90"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${Math.max(0, p)})`,
                boxShadow: `0 0 50px color-mix(in srgb, #${icon.hex === '000000' ? 'ffffff' : icon.hex} 20%, transparent)`,
              }}
            >
              <BrandIcon icon={icon} size={62} />
            </div>
          )
        })}

        <div className="relative z-10">
          <Reveal t={t} at={0.2} className="flex justify-center">
            <Eyebrow accent={CYAN}>المجتمع</Eyebrow>
          </Reveal>
          <TitleWords
            t={t}
            at={0.35}
            words={['تابع', 'الرحلة.']}
            accentIndex={1}
            accent={CYAN}
            className="mt-6 text-[150px] font-bold leading-[1.1] text-white"
          />
          <Reveal t={t} at={1} className="mt-4 text-[38px] text-[#c9ced6]">
            كل منصة، في مكان واحد.
          </Reveal>
          <Reveal t={t} at={1.4} className="mt-8 text-[32px] font-semibold text-[#19d9ff]">
            <span dir="ltr">@iiZo7al</span>
          </Reveal>
        </div>
      </div>
    </SceneShell>
  )
}

const RANKS = [
  { name: 'VIP', color: '#2be37b' },
  { name: 'MVP', color: '#19d9ff' },
  { name: 'MVP+', color: '#8b5cf6' },
  { name: 'MVP++', color: '#ffc94a' },
]

export function StoreScene({ t, duration }: SceneProps) {
  return (
    <SceneShell t={t} duration={duration} accent={GOLD} glowPosition="50% 85%">
      <div className="flex h-full flex-col items-center justify-center px-[150px] text-center">
        <Reveal t={t} at={0.2} className="flex justify-center">
          <Eyebrow accent={GOLD}>رتب السيرفر</Eyebrow>
        </Reveal>
        <TitleWords
          t={t}
          at={0.35}
          words={['متجر', 'شبكة', 'زحل']}
          accentIndex={2}
          accent={GOLD}
          className="mt-6 text-[130px] font-bold leading-[1.1] text-white"
        />
        <div dir="ltr" className="mt-14 flex items-end gap-8">
          {RANKS.map((rank, i) => {
            const p = easeOutBack(progress(t, 0.9 + i * 0.15, 0.9))
            const height = 220 + i * 50
            return (
              <div
                key={rank.name}
                className="flex w-[300px] flex-col items-center justify-end rounded-[30px] border border-white/10 bg-[#11141b]/90 pb-10"
                style={{
                  height,
                  opacity: Math.min(1, Math.max(0, p)),
                  transform: `translateY(${(1 - p) * 160}px)`,
                  background: `linear-gradient(to top, color-mix(in srgb, ${rank.color} 22%, #11141b), #11141b 75%)`,
                  boxShadow: `0 0 70px color-mix(in srgb, ${rank.color} 20%, transparent)`,
                }}
              >
                <div className="text-[60px] font-bold" style={{ color: rank.color }}>
                  {rank.name}
                </div>
              </div>
            )
          })}
        </div>
        <Reveal t={t} at={2.2} className="mt-12 text-[32px] text-[#c9ced6]">
          جميع المشتريات تتم بأمان عبر Tebex — المتجر الرسمي لزحل.
        </Reveal>
      </div>
    </SceneShell>
  )
}
