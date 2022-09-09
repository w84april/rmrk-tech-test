export const getGatewayUrl = (rawUrl = '') => {
  return rawUrl.replace('ipfs://', 'https://rmrk.mypinata.cloud/');
};
