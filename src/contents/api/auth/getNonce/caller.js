import { Method } from '../../promise-request';

const caller = (data) => {
  const version = 'v1';
  const { network, address } = data;
  const url = `/${version}/auth/nonce`;
  return ({
    method: Method.GET,
    url,
    data: { network, address },
  });
};

export default caller;
