import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FilterState {
  storedNftsPerPage: number;
  storedSearch?: string;
  storedIsForsaleOnly: boolean;
  updateNftsPerPage: (value: number) => void;
  updateIsForsaleOnly: (value: boolean) => void;
  updateSearch: (value: string) => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      set => ({
        storedNftsPerPage: 20,
        storedIsForsaleOnly: false,
        storedSearch: '',
        updateNftsPerPage: value => set({ storedNftsPerPage: value }),
        updateIsForsaleOnly: value => set({ storedIsForsaleOnly: value }),
        updateSearch: value => set({ storedSearch: value }),
      }),
      {
        name: 'filter-store',
      },
    ),
  ),
);
