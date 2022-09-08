import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import nfts from '../pages/nfts';
import { INftAsset } from '../types';
import { getGatewayUrl } from '../utils';
import { useGetNfts } from './use-get-nfts';
import axios from 'axios';

const getMetadataForAsset = async (initialArray: INftAsset[]) => {
  return await Promise.all(
    initialArray.map(nft => {
      if (!nft.metadata) {
        return;
      }
      return fetch(getGatewayUrl(nft.metadata)).then(async response => {
        const data = await response.json();
        return { ...nft, data };
      });
    }),
  );
};

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
