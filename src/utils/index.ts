export const getGatewayUrl = (rawUrl: string) => {
  return rawUrl.replace('ipfs://', 'https://rmrk.mypinata.cloud/');
};
