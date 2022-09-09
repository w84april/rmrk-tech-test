import { Flex, Grid } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetPaginatedNfts } from '../hooks/use-get-paginated-nfts';
import { useFilterStore } from '../store';
import NftAsset from './NftAsset';

const NftAssetsGrid = () => {
  const { storedPage, storedIsForsaleOnly, storedNftsPerPage, updateStoredPage } = useFilterStore(state => state);
  const { paginatedNfts, totalAssets } = useGetPaginatedNfts(storedPage, storedNftsPerPage, storedIsForsaleOnly);

  return (
    <>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(265px, 1fr))" gap={10} mt={4}>
        {paginatedNfts.map(nft => (
          <NftAsset key={nft.id} {...nft} />
        ))}
      </Grid>
      <Flex justifyContent="center" mt={4}>
        <ReactPaginate
          pageCount={Math.ceil(totalAssets / storedNftsPerPage)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
          forcePage={storedPage}
          onPageChange={({ selected }) => {
            updateStoredPage(selected);
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
