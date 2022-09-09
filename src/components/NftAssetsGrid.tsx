import { Flex, Grid } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetFilteredNfts } from '../hooks/use-get-filtered-nfts';
import { useFilterStore } from '../store';
import NftAsset from './NftAsset';
const NftAssetsGrid = () => {
  const { storedIsForsaleOnly, storedNftsPerPage } = useFilterStore(state => state);
  const [page, setPage] = useState(0);
  const { filteredNfts, isLoading, totalAssets } = useGetFilteredNfts(page, storedNftsPerPage, storedIsForsaleOnly);

  return (
    <>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(265px, 1fr))" gap={10} mt={4}>
        {filteredNfts.map(nft => (
          <NftAsset key={nft.id} {...nft} />
        ))}
      </Grid>
      <Flex justifyContent="center" mt={4}>
        <ReactPaginate
          pageCount={Math.ceil(totalAssets / storedNftsPerPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          forcePage={page}
          onPageChange={({ selected }) => {
            setPage(selected);
          }}
          containerClassName="paginator"
          previousLabel={<ChevronLeftIcon />}
          nextLabel={<ChevronRightIcon />}
        />
      </Flex>
    </>
  );
};

export default NftAssetsGrid;
