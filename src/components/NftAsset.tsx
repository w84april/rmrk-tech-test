import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, chakra, Tooltip } from '@chakra-ui/react';
const NftAsset = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box bg={useColorModeValue('white', 'gray.800')} borderWidth="1px" rounded="lg" shadow="lg" position="relative">
        <Image src={`https://rmrk.mypinata.cloud/ipfs/bafybeieogrpywsomypnaqpfkv6zzstjfxyj4r5hwzzdbmndl3hxzuhzunu`} alt="product-img" roundedTop="lg" />

        <Box p="4">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box fontSize="sm" fontWeight="semibold" as="h4" lineHeight="tight">
              Hello
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignItems="center">
            <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
              <Box as="span" color={'gray.600'} fontSize="lg">
                10 SFEDU
              </Box>
            </Box>
            {true && (
              <Box fontSize="lg" color={'gray.800'}>
                <Box as="span" color={'black'} fontSize="sm">
                  5 шт.
                </Box>
              </Box>
            )}
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};

export default NftAsset;
