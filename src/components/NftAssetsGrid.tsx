import { Flex, Grid } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useGetPaginatedNfts } from '../hooks/use-get-paginated-nfts';
import { useFilterStore } from '../store';
import NftAsset from './NftAsset';

const NftAssetsGrid = () => {
  const { storedIsForsaleOnly, storedNftsPerPage } = useFilterStore(state => state);
  const [page, setPage] = useState(0);
  const { paginatedNfts, totalAssets } = useGetPaginatedNfts(page, storedNftsPerPage, storedIsForsaleOnly);

  useEffect(() => {
    setPage(0);
  }, [storedIsForsaleOnly, storedNftsPerPage]);

  return (
    <>
      <Grid gridTemplateColumns="repeat(auto-fill, minmax(265px, 1fr))" gap={10} mt={4}>
        {paginatedNfts.map(nft => (
          <NftAsset key={nft.id} {...nft} />
        ))}
      </Grid>
      <Flex justifyContent="center" mt={4}>
        <ReactPaginate
          pageCount={Math.ceil(totalAssets / storedNftsPerPage) || 0}
          pageRangeDisplayed={2}
          marginPagesDisplayed={2}
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
