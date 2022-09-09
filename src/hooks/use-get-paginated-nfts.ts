import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { INftAsset } from '../types';
import axios from 'axios';

export const useGetPaginatedNfts = (currentPage: number, itemsPerPage: number, isForsaleOnly: boolean): { paginatedNfts: INftAsset[]; totalAssets: number } => {
  const { data } = useQuery<INftAsset[]>(['rawNftAssets'], () =>
    axios.get('https://singular.app/api/rmrk2/account/CdA62JpyfEyEASA5XKYJAyYZmdQPqe5X9x8MLnoTWtc9rNn').then(response => response.data),
  );

  const filteredNfts = useMemo(() => {
    if (!data) return [];

    return isForsaleOnly ? data.filter(item => item.forsale > 0) : data;
  }, [data, isForsaleOnly]);

  const paginatedNfts = useMemo(() => {
    const offset = currentPage * itemsPerPage;
    return filteredNfts.slice(offset, offset + itemsPerPage);
  }, [currentPage, filteredNfts, itemsPerPage]);

  return { paginatedNfts, totalAssets: filteredNfts.length };
};
