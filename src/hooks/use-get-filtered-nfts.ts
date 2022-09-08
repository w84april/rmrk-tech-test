import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { INftAsset } from '../types';
import axios from 'axios';

export const useGetFilteredNfts = (offset: number, itemsPerPage: number, isForsaleOnly: boolean): { filteredNfts: INftAsset[]; isLoading: boolean } => {
  const getAssets = (): Promise<INftAsset[]> => axios.get('https://singular.app/api/rmrk2/account/CdA62JpyfEyEASA5XKYJAyYZmdQPqe5X9x8MLnoTWtc9rNn').then(response => response.data);

  const { isLoading, data } = useQuery(['rawNftAssets'], getAssets);

  const filteredNfts = useMemo(() => {
    if (!data) {
      return [];
    }
    let initialArray = [...data];

    if (isForsaleOnly) {
      initialArray = initialArray.filter(item => item.forsale > 0);
    }

    initialArray = initialArray.slice(offset, offset + itemsPerPage);
    return initialArray;
  }, [data, isForsaleOnly, itemsPerPage, offset]);

  return { filteredNfts, isLoading };
};
