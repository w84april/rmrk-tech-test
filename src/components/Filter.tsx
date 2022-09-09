import { Checkbox, Flex, Select, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFilterStore } from '../store';

const Filter = () => {
  const { storedIsForsaleOnly, storedNftsPerPage, updateIsForsaleOnly, updateNftsPerPage, updateStoredPage } = useFilterStore(state => state);

  const [isForsaleOnly, setIsForsaleOnly] = useState(false);
  const [nftsPerPage, setNftsPerPage] = useState(0);

  //Prevent Hydration error https://nextjs.org/docs/messages/react-hydration-error
  useEffect(() => {
    setIsForsaleOnly(storedIsForsaleOnly);
    setNftsPerPage(storedNftsPerPage);
  }, [storedIsForsaleOnly, storedNftsPerPage]);

  return (
    <Flex gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Select
          onChange={e => {
            updateNftsPerPage(+e.target.value);
            updateStoredPage(0);
          }}
          value={nftsPerPage.toString()}
        >
          <option disabled value="0">
            NFTs per page
          </option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </Stack>

      <Stack spacing={5} direction="row">
        <Checkbox
          colorScheme="blue"
          onChange={e => {
            updateIsForsaleOnly(e.target.checked);
            updateStoredPage(0);
          }}
          isChecked={isForsaleOnly}
        >
          Display forsale only
        </Checkbox>
      </Stack>
    </Flex>
  );
};

export default Filter;
