import { useState, useCallback, useMemo } from 'react';
import humps from 'humps';

import promiseRequest from '../promise-request';
import caller from './caller';

const transform = (data) => humps.camelizeKeys(data.data || data);

function useGetCampaigns() {
  const requestAction = useMemo(() => promiseRequest(caller, transform), []);
  const [loading, setLoading] = useState(false);
  const handleRequest = useCallback((params) => requestAction(params), [
    requestAction,
  ]);
  const getCampaigns = useCallback(
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
    getCampaigns,
    loadingGetCampaigns: loading,
  };
}

export default useGetCampaigns;
