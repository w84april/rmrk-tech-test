import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, chakra, Tooltip, Grid } from '@chakra-ui/react';
import { useGetFilteredNfts } from '../hooks/use-get-filtered-nfts';
import { useFilterStore } from '../store';
import NftAsset from './NftAsset';
const NftAssetsGrid = () => {
  const { storedSearch, storedIsForsaleOnly, storedNftsPerPage, updateSearch, updateIsForsaleOnly, updateNftsPerPage } = useFilterStore(state => state);
  const { filteredNfts, isLoading } = useGetFilteredNfts(0, storedNftsPerPage, storedIsForsaleOnly, storedSearch);
  return (
    <Grid gridTemplateColumns="repeat(auto-fill, minmax(265px, 1fr))" gap={10} mt={4}>
      {filteredNfts.map(nft => (
        <NftAsset key={nft.id} {...nft} />
      ))}
    </Grid>
  );
};

export default NftAssetsGrid;
