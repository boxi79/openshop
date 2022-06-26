import isNil from 'lodash/isNil';
import { Method } from '../promise-request';

const caller = (data) => {
  const version = 'v1';
  const {
    authToken, network, uuid, ...rest
  } = data;
  const url = isNil(data.uuid) ? `/${version}/redeemcenter/${network}/campaigns` : `/${version}/redeemcenter/${network}/campaigns/${uuid}`;
  return ({
    method: Method.GET,
    url,
    data: {
      mine: true,
      ...rest,
    },
  });
};

export default caller;
