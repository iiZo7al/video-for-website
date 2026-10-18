import { FortniteScene, SocialsScene, StoreScene } from './scenes/community-scenes'
import { IntroScene } from './scenes/intro-scenes'
import { MinecraftScene, ModpacksScene } from './scenes/minecraft-scenes'
import { OutroScene } from './scenes/outro-scene'
import type { SceneDefinition } from './types'

export const SCENES: SceneDefinition[] = [
  { id: 'intro', labelKey: 'navIntro', start: 0, duration: 6, accent: '#ff7a00', Component: IntroScene },
  { id: 'minecraft', labelKey: 'navMinecraft', start: 5.5, duration: 5, accent: '#ff7a00', Component: MinecraftScene },
  { id: 'modpacks', labelKey: 'navModpacks', start: 10, duration: 4.5, accent: '#2be37b', Component: ModpacksScene },
  { id: 'fortnite', labelKey: 'navFortnite', start: 14, duration: 5, accent: '#8b5cf6', Component: FortniteScene },
  { id: 'socials', labelKey: 'navSocials', start: 18.5, duration: 4.5, accent: '#19d9ff', Component: SocialsScene },
  { id: 'store', labelKey: 'navStore', start: 22.5, duration: 4.5, accent: '#ff7a00', Component: StoreScene },
  { id: 'outro', labelKey: 'outroCta', start: 26.5, duration: 5.5, accent: '#ff7a00', Component: OutroScene },
]

export const OUTRO_START = 26.5
export const TOTAL_DURATION = 32
