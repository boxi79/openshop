import { useState, useCallback, useMemo } from 'react';
import humps from 'humps';

import promiseRequest from '../../promise-request';
import caller from './caller';

const transform = (data) => humps.camelizeKeys(data);

function useGetNonce() {
  const requestAction = useMemo(() => promiseRequest(caller, transform), []);
  const [loading, setLoading] = useState(false);
  const handleRequest = useCallback((params) => requestAction(params), [
    requestAction,
  ]);
  const getNonce = useCallback(
    async (payload) => {
      setLoading(true);

      const { data, error } = await handleRequest(payload);
      setLoading(false);

      if (error) {
        return Promise.reject(error);
      }
      return Promise.resolve(data);
    },
    [handleRequest],
  );

  return {
    getNonce,
    loadingGetNonce: loading,
  };
}

export default useGetNonce;
