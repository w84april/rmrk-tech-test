export interface INftAsset {
  id: string;
  block: number;
  forsale: number;
  collectionId: string;
  symbol: string;
  metadata: string;
  owner: string;
  sn: string;
  image?: string;
  transferable: number;
  isComposable: boolean;
  primaryResource: {
    base: boolean;
  };
  resources?: {
    id: string;
    src: string;
  }[];
}

export interface INftMetadata {
  description: string;
  name: string;
  mediaUri?: string;
  image?: string;
  thumbnailUri?: string;
}
