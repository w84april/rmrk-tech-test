import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { INftAsset } from '../types';
import axios from 'axios';

export const useGetFilteredNfts = (offset: number, itemsPerPage: number, isForsaleOnly: boolean, search?: string): { filteredNfts: INftAsset[]; isLoading: boolean } => {
  const getAssets = (): Promise<INftAsset[]> => axios.get('https://singular.app/api/rmrk2/account/CdA62JpyfEyEASA5XKYJAyYZmdQPqe5X9x8MLnoTWtc9rNn').then(response => response.data);

  const { isLoading, data } = useQuery(['rawNftAssets'], getAssets);

  const filteredNfts = useMemo(() => {
    if (!data) {
      return [];
    }
    let initialArray = [...data];
    if (search) {
      initialArray = initialArray.filter(item => {
        const regExp = new RegExp(search, 'ig');
        if (item.symbol && item.collectionId && !regExp.test(item.symbol) && !regExp.test(item.collectionId)) {
          return false;
        }
        return true;
      });
    }

    if (isForsaleOnly) {
      initialArray = initialArray.filter(item => item.forsale > 0);
    }

    initialArray = initialArray.slice(offset, offset + itemsPerPage);
    return initialArray;
  }, [data, isForsaleOnly, itemsPerPage, offset, search]);

  return { filteredNfts, isLoading };
};
