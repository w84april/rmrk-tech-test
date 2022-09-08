import { useEffect, useMemo, useState } from 'react';
import { INftAsset } from '../types';
import { getGatewayUrl } from '../utils';
import { useGetNfts } from './use-get-nfts';

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
  const { nfts, isLoading } = useGetNfts();
  const [filteredNfts, setFilteredNfts] = useState<INftAsset[]>([]);

  useEffect(() => {
    let initialArray = [...nfts];
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
    getMetadataForAsset(initialArray).then(result => setFilteredNfts(result));
  }, [isForsaleOnly, itemsPerPage, nfts, offset, search]);

  return { filteredNfts, isLoading };
};
