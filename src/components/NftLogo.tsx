import { Box, Image } from '@chakra-ui/react';
import { useState } from 'react';

interface NftLogoProps {
  mediaUri?: string;
}

export const NftLogo = ({ mediaUri }: NftLogoProps) => {
  const [isVideo, setIsVideo] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <Box roundedTop="lg">
      {!isVideo ? (
        <Image
          src={mediaUri}
          onError={() => {
            setIsVideo(true);
          }}
          alt="nft-logo"
          roundedTop="lg"
          objectFit={'cover'}
          maxH="100%"
          w="100%"
          fallbackSrc="https://via.placeholder.com/300"
        />
      ) : (
        <video width="100%" height="100%" autoPlay loop muted playsInline style={{ borderRadius: '0.5rem 0.5rem 0 0', objectFit: 'cover' }}>
          <source
            src={mediaUri}
            type="video/mp4"
            onError={() => {
              setIsError(true);
            }}
          />
        </video>
      )}
      {isError ? <div>Error</div> : null}
    </Box>
  );
};
