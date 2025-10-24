import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string
  advertiserId: string
  setAccessToken: (t: string) => void
  setAdvertiserId: (id: string) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: '',
      advertiserId: '',
      setAccessToken: (t) => set({ accessToken: t }),
      setAdvertiserId: (id) => set({ advertiserId: id }),
      clear: () => set({ accessToken: '', advertiserId: '' }),
    }),
    { name: 'sdk-auth' }
  )
)
