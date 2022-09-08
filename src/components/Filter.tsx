import { Box, Checkbox, Flex, Select, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFilterStore } from '../store';

const Filter = () => {
  const { storedIsForsaleOnly, storedNftsPerPage, updateIsForsaleOnly, updateNftsPerPage } = useFilterStore(state => state);

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
          placeholder="NFTs per page"
          onChange={e => {
            updateNftsPerPage(+e.target.value);
          }}
          value={nftsPerPage.toString()}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </Stack>

      <Stack spacing={5} direction="row">
        <Checkbox colorScheme="blue" onChange={e => updateIsForsaleOnly(e.target.checked)} isChecked={isForsaleOnly}>
          Display forsale only
        </Checkbox>
      </Stack>
    </Flex>
  );
};

export default Filter;
