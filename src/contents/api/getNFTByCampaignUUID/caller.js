import { Method } from '../promise-request';

const caller = (data) => {
  const version = 'v1';
  const {
    authToken, network, uuid, ...rest
  } = data;
  const url = `${version}/redeemcenter/${network}/campaigns/${uuid}/nfts`;
  return ({
    method: Method.GET,
    url,
    data: rest,
  });
};

export default caller;
