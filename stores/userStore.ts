import create from 'zustand'
import { Screen, User } from '../types'

export type State = {
  user?: User
  setUser: (user?: User) => void
}

export const useUserStore = create<State>((set) => ({
  setUser: (user) => set({ user }),
}))

export const userSelector = (state: State) => state.user
export const setUserSelector = (state: State) => state.setUser
