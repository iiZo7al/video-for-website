import type { ComponentType } from 'react'
import type { PromoCopy } from './copy'

export type SceneProps = {
  t: number
  duration: number
}

export type SceneDefinition = {
  id: string
  labelKey: keyof PromoCopy
  start: number
  duration: number
  accent: string
  Component: ComponentType<SceneProps>
}
