import { Box, Checkbox, Flex, Input, Select, Stack } from '@chakra-ui/react';
import { useState } from 'react';

const Filter = () => {
  const [search, setSearch] = useState('');
  const [isForsaleOnly, setIsForsaleOnly] = useState(false);
  const [nftsPerPage, setNftsPerPage] = useState('20');

  return (
    <Flex gap="20px">
      <Stack direction="row" justifyContent="space-between">
        <Select placeholder="NFTs per page" onChange={e => setNftsPerPage(e.target.value)} value={nftsPerPage}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </Select>
      </Stack>
      <Box>
        <Input variant="outline" placeholder="Search" onChange={e => setSearch(e.target.value)} />
      </Box>
      <Stack spacing={5} direction="row">
        <Checkbox colorScheme="blue" onChange={e => setIsForsaleOnly(e.target.checked)} checked={isForsaleOnly}>
          Display forsale only
        </Checkbox>
      </Stack>
    </Flex>
  );
};

export default Filter;
