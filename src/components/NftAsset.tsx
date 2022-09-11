import { Flex, Box, useColorModeValue, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { INftAsset, INftMetadata } from '../types';
import { getGatewayUrl } from '../utils';
import axios from 'axios';
import NextLink from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { NftLogo } from './NftLogo';

const NftAsset = ({ id, sn, metadata, image }: INftAsset) => {
  const { data } = useQuery<INftMetadata>(['nftMetadata', id], () => axios.get(getGatewayUrl(metadata)).then(response => response.data));

  return (
    <LinkBox>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
        direction="column"
        justifyContent="space-between"
        h="100%"
        w="100%"
      >
        <Flex roundedTop="lg" alignItems="center" justifyContent="center" h="100%" maxH={300}>
          <NftLogo mediaUri={getGatewayUrl(image || data?.mediaUri || data?.image || data?.thumbnailUri)} />
        </Flex>

        <Box p="4">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Text fontSize="sm" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={2} maxW={260}>
              <NextLink href={`/nfts/${id}`} passHref>
                <LinkOverlay>{data?.name}</LinkOverlay>
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
      </Flex>
    </LinkBox>
  );
};

export default NftAsset;
