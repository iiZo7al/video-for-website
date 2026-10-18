import { FortniteScene, SocialsScene, StoreScene } from './scenes/community-scenes'
import { HeadlineScene, IntroScene } from './scenes/intro-scenes'
import { MinecraftScene, ModpacksScene } from './scenes/minecraft-scenes'
import { OutroScene } from './scenes/outro-scene'
import type { SceneDefinition } from './types'

export const SCENES: SceneDefinition[] = [
  { id: 'intro', label: 'البداية', start: 0, duration: 4.5, accent: '#ff7a00', Component: IntroScene },
  { id: 'headline', label: 'ابنِ. العب. أبدع.', start: 4, duration: 5, accent: '#ff7a00', Component: HeadlineScene },
  { id: 'minecraft', label: 'شبكة زحل', start: 8.5, duration: 5, accent: '#ff7a00', Component: MinecraftScene },
  { id: 'modpacks', label: 'المودباكات', start: 13, duration: 4.5, accent: '#2be37b', Component: ModpacksScene },
  { id: 'fortnite', label: 'فورتنايت', start: 17, duration: 5, accent: '#8b5cf6', Component: FortniteScene },
  { id: 'socials', label: 'التواصل', start: 21.5, duration: 4.5, accent: '#19d9ff', Component: SocialsScene },
  { id: 'store', label: 'المتجر', start: 25.5, duration: 4.5, accent: '#ffc94a', Component: StoreScene },
  { id: 'outro', label: 'الختام', start: 29.5, duration: 5.5, accent: '#ff7a00', Component: OutroScene },
]

export const TOTAL_DURATION = 35
