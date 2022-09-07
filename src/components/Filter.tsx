import { Box, Checkbox, Flex, Input, Select, Stack } from '@chakra-ui/react';
import { useFilterStore } from '../store';

const Filter = () => {
  const { isForsaleOnly, nftsPerPage, updateSearch, updateIsForsaleOnly, updateNftsPerPage } = useFilterStore(state => state);
  return (
    <Flex gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Select placeholder="NFTs per page" onChange={e => updateNftsPerPage(+e.target.value)} value={nftsPerPage}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </Stack>
      <Box>
        <Input variant="outline" placeholder="Search" onChange={e => updateSearch(e.target.value)} />
      </Box>
      <Stack spacing={5} direction="row">
        <Checkbox colorScheme="blue" onChange={e => updateIsForsaleOnly(e.target.checked)} checked={isForsaleOnly}>
          Display forsale only
        </Checkbox>
      </Stack>
    </Flex>
  );
};

export default Filter;
