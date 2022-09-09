import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FilterState {
  storedPage: number;
  storedNftsPerPage: number;
  storedIsForsaleOnly: boolean;
  updateStoredPage: (value: number) => void;
  updateNftsPerPage: (value: number) => void;
  updateIsForsaleOnly: (value: boolean) => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      set => ({
        storedPage: 0,
        storedNftsPerPage: 20,
        storedIsForsaleOnly: false,
        updateStoredPage: value => set({ storedPage: value }),
        updateNftsPerPage: value => set({ storedNftsPerPage: value }),
        updateIsForsaleOnly: value => set({ storedIsForsaleOnly: value }),
      }),
      {
        name: 'filter-store',
      },
    ),
  ),
);
