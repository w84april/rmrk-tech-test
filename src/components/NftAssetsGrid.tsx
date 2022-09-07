import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, chakra, Tooltip, Grid } from '@chakra-ui/react';
import { useFilterStore } from '../store';
import NftAsset from './NftAsset';
const NftAssetsGrid = () => {
  const { storedIsForsaleOnly, storedNftsPerPage, updateSearch, updateIsForsaleOnly, updateNftsPerPage } = useFilterStore(state => state);

  return (
    <Grid gridTemplateColumns="repeat(auto-fill, minmax(265px, 1fr))" gap={10} mt={4}>
      <NftAsset /> <NftAsset /> <NftAsset /> <NftAsset /> <NftAsset /> <NftAsset /> <NftAsset /> <NftAsset /> <NftAsset />
    </Grid>
  );
};

export default NftAssetsGrid;
