// Mock @plasmohq/storage for demo mode
import { useState, useEffect } from 'react'

export class Storage {
  private area: string
  private store: Record<string, any> = {}

  constructor(opts?: { area?: string }) {
    this.area = opts?.area || 'local'
    // Load from localStorage
    try {
      const saved = localStorage.getItem(`plasmo_${this.area}`)
      if (saved) this.store = JSON.parse(saved)
    } catch {}
  }

  async get(key: string) {
    return this.store[key] ?? null
  }

  async set(key: string, value: any) {
    this.store[key] = value
    try {
      localStorage.setItem(`plasmo_${this.area}`, JSON.stringify(this.store))
    } catch {}
  }

  async remove(key: string) {
    delete this.store[key]
    try {
      localStorage.setItem(`plasmo_${this.area}`, JSON.stringify(this.store))
    } catch {}
  }

  watch(opts: Record<string, (change: any) => void>) {
    // No-op in demo
    return () => {}
  }
}

export function useStorage(key: string, defaultValue?: any) {
  const [value, setValue] = useState(defaultValue)
  return [value, setValue] as const
}

export default Storage
