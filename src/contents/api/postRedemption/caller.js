import humps from 'humps';
import { Method } from '../promise-request';

const caller = (data) => {
  const version = 'v1';
  const {
    network, uuid, contractAddress, tokenId, signature, userInputData,
  } = data;
  const url = `${version}/redeemcenter/${network}/campaigns/${uuid}/redemption`;
  const payload = {
    contractAddress,
    tokenId,
    signature,
    userInputData,
  };
  return ({
    method: Method.POST,
    url,
    data: humps.decamelizeKeys(payload),
  });
};

export default caller;
