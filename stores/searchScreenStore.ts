import create from 'zustand'
import { Screen } from '../types'

export type State = {
  activeScreen: Screen
  setActiveScreen: (tab: Screen) => void
  search: string
  setSearch: (value: string) => void
}

export const useSearchStore = create<State>((set) => ({
  activeScreen: 'foldersList',
  setActiveScreen: (screen) => set({ activeScreen: screen, search: '' }),
  search: '',
  setSearch: (search) => set({ search }),
}))

export const activeScreenSelector = (state: State) => state.activeScreen
export const setActiveScreenSelector = (state: State) => state.setActiveScreen
export const searchSelector = (state: State) => state.search
export const setSearchSelector = (state: State) => state.setSearch
