import { Box, Center, Heading, Text, Stack, useColorModeValue } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NftLogo } from '../../../components/NftLogo';
import { INftAsset, INftMetadata } from '../../../types';
import { getGatewayUrl } from '../../../utils';

const NftPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery<INftAsset[]>(['singleNft', id], () => axios.get(`https://singular.app/api/rmrk2/nft/${id}`).then(response => response.data), { enabled: !!id });

  const { data: singleNftMetadata } = useQuery<INftMetadata>(['nftMetadata', id], () => axios.get(getGatewayUrl(data?.[0]?.metadata)).then(response => response.data), {
    enabled: !!data?.[0].metadata,
  });

  return (
    <Center py={6}>
      <Box maxW={'445px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>
        <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <NftLogo mediaUri={getGatewayUrl(singleNftMetadata?.mediaUri)} />
        </Box>
        <Stack>
          <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} fontFamily={'body'}>
            {singleNftMetadata?.name}
          </Heading>
          <Text color={'gray.500'}>{singleNftMetadata?.description}</Text>
        </Stack>
      </Box>
    </Center>
  );
};
export default NftPage;
