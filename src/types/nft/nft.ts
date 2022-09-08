export interface INftAsset {
  id: string;
  block: number;
  forsale: number;
  collectionId: string;
  symbol: string;
  metadata: string;
  owner: string;
  sn: string;
  transferable: number;
  isComposable: boolean;
  primaryResource: {
    base: boolean;
  };
}

export interface INftMetadata {
  description: string;
  name: string;
  mediaUri: string;
  thumbnailUri: string;
}
