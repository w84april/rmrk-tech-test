import { useEffect, useState } from 'react';
import { INftAsset } from '../types';

export const useGetNfts = (): { nfts: INftAsset[]; isLoading: boolean } => {
  const [nfts, setNfts] = useState<INftAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://singular.app/api/rmrk2/account/CdA62JpyfEyEASA5XKYJAyYZmdQPqe5X9x8MLnoTWtc9rNn')
      .then(res => res.json())
      .then(data => {
        setNfts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return { nfts, isLoading };
};
