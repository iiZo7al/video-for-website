import type { SimpleIcon } from 'simple-icons'

export function BrandIcon({ icon, size = 48, color }: { icon: SimpleIcon; size?: number; color?: string }) {
  const hex = icon.hex === '000000' || icon.hex === '313131' ? 'ffffff' : icon.hex
  return (
    <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" width={size} height={size} fill={color ?? `#${hex}`}>
      <path d={icon.path} />
    </svg>
  )
}
