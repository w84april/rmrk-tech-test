import { Box, Center, Heading, Text, Stack, Avatar, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NftLogo } from '../../../components/NftLogo';
import { INftAsset, INftMetadata } from '../../../types';
import { getGatewayUrl } from '../../../utils';

const NftPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [refreshedId, setRefreshedId] = useState<string | string[] | undefined>('');
  const getSingleNft = (): Promise<INftAsset[]> => axios.get(`https://singular.app/api/rmrk2/nft/${refreshedId}`).then(response => response.data);
  const { data } = useQuery(['singleNft', refreshedId], getSingleNft, { enabled: !!refreshedId });

  const getMetadata = (): Promise<INftMetadata> => axios.get(getGatewayUrl(data?.[0]?.metadata || '')).then(response => response.data);
  const { data: singleNftMetadata } = useQuery(['singleNftMetadata', refreshedId], getMetadata, { enabled: !!data?.[0].metadata });
  const [mediaUri, setMediaUri] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    if (singleNftMetadata?.mediaUri) {
      setMediaUri(singleNftMetadata?.mediaUri);
    }
    if (singleNftMetadata?.name) {
      setName(singleNftMetadata?.name);
    }
    if (singleNftMetadata?.description) {
      setDescription(singleNftMetadata.description);
    }
    if (id) {
      setRefreshedId(id);
    }
  }, [id, singleNftMetadata?.description, singleNftMetadata?.mediaUri, singleNftMetadata?.name]);

  return (
    <Center py={6}>
      <Box maxW={'445px'} w={'full'} bg={useColorModeValue('white', 'gray.900')} boxShadow={'2xl'} rounded={'md'} p={6} overflow={'hidden'}>
        <Box bg={'gray.100'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <NftLogo mediaUri={getGatewayUrl(mediaUri)} />
        </Box>
        <Stack>
          <Heading color={useColorModeValue('gray.700', 'white')} fontSize={'2xl'} fontFamily={'body'}>
            {name}
          </Heading>
          <Text color={'gray.500'}>{description}</Text>
        </Stack>
      </Box>
    </Center>
  );
};
export default NftPage;
