import create from 'zustand';

interface FilterState {
  nftsPerPage: number;
  search?: string;
  isForsaleOnly: boolean;
  updateNftsPerPage: (value: number) => void;
  updateIsForsaleOnly: (value: boolean) => void;
  updateSearch: (value: string) => void;
}

export const useFilterStore = create<FilterState>()(set => ({
  nftsPerPage: 20,
  isForsaleOnly: false,
  search: '',
  updateNftsPerPage: value => set({ nftsPerPage: value }),
  updateIsForsaleOnly: value => set({ isForsaleOnly: value }),
  updateSearch: value => set({ search: value }),
}));
