import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { INftAsset } from '../types';
import axios from 'axios';

export const useGetFilteredNfts = (currentPage: number, itemsPerPage: number, isForsaleOnly: boolean): { filteredNfts: INftAsset[]; isLoading: boolean; totalAssets: number } => {
  const getAssets = (): Promise<INftAsset[]> => axios.get('https://singular.app/api/rmrk2/account/CdA62JpyfEyEASA5XKYJAyYZmdQPqe5X9x8MLnoTWtc9rNn').then(response => response.data);

  const { isLoading, data } = useQuery(['rawNftAssets'], getAssets);
  const [totalAssets, setTotalAssets] = useState(0);
  const filteredNfts = useMemo(() => {
    if (!data) {
      return [];
    }
    let initialArray = [...data];

    if (isForsaleOnly) {
      initialArray = initialArray.filter(item => item.forsale > 0);
    }
    setTotalAssets(initialArray.length);
    const offset = currentPage * itemsPerPage;
    initialArray = initialArray.slice(offset, offset + itemsPerPage);
    return initialArray;
  }, [currentPage, data, isForsaleOnly, itemsPerPage]);

  return { filteredNfts, isLoading, totalAssets };
};
