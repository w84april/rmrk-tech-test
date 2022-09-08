import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface FilterState {
  storedNftsPerPage: number;
  storedIsForsaleOnly: boolean;
  updateNftsPerPage: (value: number) => void;
  updateIsForsaleOnly: (value: boolean) => void;
}

export const useFilterStore = create<FilterState>()(
  devtools(
    persist(
      set => ({
        storedNftsPerPage: 20,
        storedIsForsaleOnly: false,
        updateNftsPerPage: value => set({ storedNftsPerPage: value }),
        updateIsForsaleOnly: value => set({ storedIsForsaleOnly: value }),
      }),
      {
        name: 'filter-store',
      },
    ),
  ),
);
