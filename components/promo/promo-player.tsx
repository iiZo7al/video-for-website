'use client'

import { Maximize, Pause, Play, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { formatTime } from '@/lib/motion'
import { PromoStage } from './promo-stage'
import { SCENES, TOTAL_DURATION } from './timeline'
import { useVideoClock } from './use-video-clock'

const STAGE_WIDTH = 1920

export function PromoPlayer() {
  const { time, playing, toggle, seek, restart, setPlaying } = useVideoClock(TOTAL_DURATION)
  const frameRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / STAGE_WIDTH))
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  const activeScene = [...SCENES].reverse().find((scene) => time >= scene.start) ?? SCENES[0]
  const ended = time >= TOTAL_DURATION

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLButtonElement) return
    if (event.key === ' ' || event.key === 'k') {
      event.preventDefault()
      toggle()
    } else if (event.key === 'ArrowRight') {
      seek(time + 3)
    } else if (event.key === 'ArrowLeft') {
      seek(time - 3)
    }
  }

  const enterFullscreen = () => {
    containerRef.current?.requestFullscreen?.()
  }

  return (
    <div className="flex w-full flex-col gap-5">
      <div
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label="فيديو تعريفي لموقع ZO7AL"
        role="region"
        className="group relative flex w-full flex-col justify-center overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.6)] focus-visible:outline-2 focus-visible:outline-[#19d9ff]"
      >
        <div ref={frameRef} className="relative aspect-video w-full overflow-hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'إيقاف مؤقت' : 'تشغيل'}
            className="absolute inset-0 z-10 cursor-pointer"
          />
          {scale > 0 && (
            <div className="absolute left-0 top-0 origin-top-left" style={{ transform: `scale(${scale})` }}>
              <PromoStage time={time} />
            </div>
          )}
          {!playing && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-black/20">
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#ff7a00] text-black shadow-[0_0_60px_rgba(255,122,0,0.6)]">
                {ended ? <RotateCcw className="h-9 w-9" /> : <Play className="h-9 w-9 translate-x-0.5" />}
              </span>
            </div>
          )}
        </div>
      </div>

      <div dir="rtl" className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#11141b] p-4 md:p-5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'إيقاف مؤقت' : 'تشغيل'}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff7a00] text-black transition-transform hover:scale-105"
          >
            {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={restart}
            aria-label="إعادة من البداية"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10"
          >
            <RotateCcw className="h-5 w-5" />
          </button>

          <label className="sr-only" htmlFor="promo-scrubber">
            موضع الفيديو
          </label>
          <input
            id="promo-scrubber"
            type="range"
            min={0}
            max={TOTAL_DURATION}
            step={0.01}
            value={time}
            onPointerDown={() => setPlaying(false)}
            onChange={(event) => seek(Number(event.target.value))}
            className="h-2 flex-1 cursor-pointer accent-[#ff7a00]"
            dir="ltr"
          />

          <span dir="ltr" className="w-24 shrink-0 text-center font-mono text-sm tabular-nums text-[#8f96a3]">
            {formatTime(time)} / {formatTime(TOTAL_DURATION)}
          </span>

          <button
            type="button"
            onClick={enterFullscreen}
            aria-label="ملء الشاشة"
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 sm:flex"
          >
            <Maximize className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="مشاهد الفيديو" className="flex flex-wrap gap-2">
          {SCENES.map((scene) => {
            const isActive = scene.id === activeScene.id
            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => {
                  seek(scene.start + (scene.start === 0 ? 0 : 0.5))
                  setPlaying(true)
                }}
                aria-current={isActive ? 'true' : undefined}
                className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors"
                style={{
                  borderColor: isActive ? scene.accent : 'rgba(255,255,255,0.1)',
                  background: isActive ? `color-mix(in srgb, ${scene.accent} 14%, transparent)` : 'transparent',
                  color: isActive ? '#fff' : '#8f96a3',
                }}
              >
                <span className="h-2 w-2 rounded-full" style={{ background: scene.accent }} />
                {scene.label}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
