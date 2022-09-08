import { Flex, Circle, Box, Image, Badge, useColorModeValue, Text, Icon, chakra, Tooltip, AspectRatio } from '@chakra-ui/react';
import { INftAsset } from '../types';
import { getGatewayUrl } from '../utils';
import Error from '../assets/error.png';

const NftAsset = ({ id, collectionId, data }: INftAsset) => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box bg={useColorModeValue('white', 'gray.800')} borderWidth="1px" rounded="lg" shadow="lg" position="relative">
        <Image src={data.mediaUri && getGatewayUrl(data.mediaUri)} fallbackSrc={'../assets/error.png'} alt="nft-logo" roundedTop="lg" />

        <Box p="4">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Text fontSize="sm" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={2} maxW={260}>
              {id}
            </Text>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Text as="span" color={'gray.600'} fontSize="lg" noOfLines={1} maxW={60}>
                {collectionId}
              </Text>
            </Box>
            {/* {true && (
              <Box fontSize="lg" color={'gray.800'}>
                <Box as="span" color={'black'} fontSize="sm">
                  5 шт.
                </Box>
              </Box>
            )} */}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default NftAsset;
