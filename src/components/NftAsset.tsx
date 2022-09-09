import { Flex, Circle, Box, Image, Badge, useColorModeValue, Text, Icon, chakra, Tooltip, AspectRatio, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { INftAsset, INftMetadata } from '../types';
import { getGatewayUrl } from '../utils';
import Error from '../assets/error.png';
import axios from 'axios';
import NextLink from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { NftLogo } from './NftLogo';

const NftAsset = ({ id, sn, metadata }: INftAsset) => {
  const getMetadata = (): Promise<INftMetadata> => axios.get(getGatewayUrl(metadata)).then(response => response.data);
  const { isLoading, data } = useQuery(['nftMetadata', id], getMetadata);
  const [mediaUri, setMediaUri] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (data?.mediaUri) {
      setMediaUri(data.mediaUri);
    }
    if (data?.name) {
      setName(data.name);
    }
  }, [data?.mediaUri, data?.name]);

  return (
    <LinkBox>
      <Flex alignItems="center" justifyContent="center">
        <Box bg={useColorModeValue('white', 'gray.800')} borderWidth="1px" rounded="lg" shadow="lg" position="relative">
          <NftLogo mediaUri={getGatewayUrl(mediaUri)} />

          <Box p="4">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Text fontSize="sm" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={2} maxW={260}>
                <NextLink href={`/nfts/${id}`} passHref>
                  <LinkOverlay>{name}</LinkOverlay>
                </NextLink>
              </Text>
            </Flex>

            <Flex justifyContent="space-between" alignItems="center">
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Text as="span" color={'gray.600'} fontSize="lg" noOfLines={1} maxW={60}>
                  {sn}
                </Text>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </LinkBox>
  );
};

export default NftAsset;
