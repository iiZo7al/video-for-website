'use client'

import { createContext, useContext } from 'react'
import data from './copy-data.json'

export type PromoCopy = (typeof data)['ar']
export type Locale = keyof typeof data

export const LOCALES = Object.keys(data) as Locale[]
export const COPY = data as Record<Locale, PromoCopy>

export const CopyContext = createContext<PromoCopy>(COPY.ar)

export function useCopy() {
  return useContext(CopyContext)
}

export function splitTitle(text: string) {
  const words = text.split(' ').filter(Boolean)
  return { words, accentIndex: words.length - 1 }
}
