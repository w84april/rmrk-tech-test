import { Flex } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Filter from '../../components/Filter';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import NftAsset from '../../components/NftAsset';
import NftAssetsGrid from '../../components/NftAssetsGrid';

const NftAssets: NextPage = () => {
  return (
    <Flex flexDir="column" justify="flex-start" mt={20} borderTop="1px" borderColor="gray.200" p={4}>
      <Filter />
      <NftAssetsGrid />
    </Flex>
  );
};

export default NftAssets;