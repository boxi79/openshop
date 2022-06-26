import { Method } from '../../promise-request';

const caller = () => {
  const version = 'v1';
  const url = `/${version}/config`;
  return ({
    method: Method.GET,
    url,
  });
};

export default caller;
