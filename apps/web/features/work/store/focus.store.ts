import { create } from 'zustand'

interface FocusStore {
  isRunning: boolean
  startTime: number | null
  elapsedTime: number
  start: () => void
  pause: () => void
  reset: () => void
}

export const useFocusStore = create<FocusStore>((set, get) => ({
  isRunning: false,
  startTime: null,
  elapsedTime: 0,

  start: () => {
    set((state) => {
      if (state.isRunning) return state
      return {
        isRunning: true,
        startTime: Date.now() - state.elapsedTime,
      }
    })
  },

  pause: () => {
    set((state) => {
      if (!state.isRunning || !state.startTime) return state
      const newElapsedTime = Date.now() - state.startTime
      return {
        isRunning: false,
        elapsedTime: newElapsedTime,
      }
    })
  },

  reset: () => {
    set({
      isRunning: false,
      startTime: null,
      elapsedTime: 0,
    })
  },
}))

