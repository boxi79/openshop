import isNil from 'lodash/isNil';
import { Method } from '../promise-request';

const caller = (data) => {
  const version = 'v1';
  const {
    network, uuid,
  } = data;
  const url = isNil(data.uuid) ? `/${version}/redeemcenter/${network}/redemption` : `/${version}/redeemcenter/${network}/redemption/${uuid}`;
  return ({
    method: Method.GET,
    url,
  });
};

export default caller;
