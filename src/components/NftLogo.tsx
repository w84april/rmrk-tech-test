import { Text, Image } from '@chakra-ui/react';
import { useState } from 'react';

interface NftLogoProps {
  mediaUri?: string;
}

export const NftLogo = ({ mediaUri }: NftLogoProps) => {
  const [isVideo, setIsVideo] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <>
      {isVideo ? (
        <video width="100%" height="100%" autoPlay loop muted playsInline style={{ borderRadius: '0.5rem 0.5rem 0 0', objectFit: 'contain', height: '100%', width: '100%' }}>
          <source
            src={mediaUri}
            type="video/mp4"
            onError={() => {
              setIsError(true);
            }}
          />
        </video>
      ) : (
        <Image
          src={mediaUri}
          onError={() => {
            setIsVideo(true);
          }}
          alt="nft-logo"
          roundedTop="lg"
          objectFit={'contain'}
          w="100%"
          h="100%"
          fallbackSrc="https://via.placeholder.com/300"
        />
      )}
      {isError && <Text>Error</Text>}
    </>
  );
};
