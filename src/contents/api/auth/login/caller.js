import { Method } from '../../promise-request';

const caller = (data) => {
  const version = 'v1';
  const { network, address, signature } = data;
  const url = `/${version}/auth/login`;
  return ({
    method: Method.POST,
    url,
    data: {
      network,
      address,
      signature,
    },
  });
};

export default caller;
