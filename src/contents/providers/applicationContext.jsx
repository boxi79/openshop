import PropTypes from 'prop-types';
import React, {
  createContext, useState, useEffect, useContext,
} from 'react';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import get from 'lodash/get';
import { Logger } from '../api/logger';
import { useAuthContext } from './authProvider';
import { redeemProtocolABI } from '../abi';
import { useGetNonce } from '../api/auth/getNonce';
import { useGetConfig } from '../api/config/getConfig';
import { signMessage } from '../rpc';
import { chainMapping } from '../config';

const ApplicationContext = createContext({
  activatingConnector: false,
  setActivatingConnector: () => { }, // Be activating connector
  web3: {},
  redreamerProtocolContract: undefined,
  redreamerProtocolAddress: undefined,
  currentChainType: '',
  contentPath: '/',
});

export const ApplicationProvider = ({ children }) => {
  const {
    connector, library, account = '', chainId,
  } = useWeb3React();
  const userAddress = account.toLowerCase();
  const { login, resetAuth } = useAuthContext();
  const [contentPath, setContentPath] = useState('/');
  const [activatingConnector, setActivatingConnector] = useState();
  const [web3, setWeb3] = useState();
  const [redreamerProtocolAddr, setRedreamerProtocolAddr] = useState({});
  const [redreamerProtocolContract, setRedreamerProtocolContract] = useState({});
  const { getNonce } = useGetNonce();
  const { getConfig } = useGetConfig();

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig();
      const { redreamerProtocolAddresses = {} } = config;
      setRedreamerProtocolAddr(redreamerProtocolAddresses);
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (web3 && redreamerProtocolAddr && library && chainId) {
      const chainName = chainMapping[chainId];
      const contractInstance = new web3.eth.Contract(
        redeemProtocolABI, redreamerProtocolAddr[chainName],
      );
      setRedreamerProtocolContract(contractInstance);
    }
  }, [web3, redreamerProtocolAddr, library, chainId]);

  useEffect(() => {
    // for MetaMask: window.etheurm === library.provider
    if (library && library.provider) {
      const w = new Web3(library.provider);
      window.web3 = w;
      setWeb3(w);
    }
  }, [library]);

  useEffect(() => {
    if (library && userAddress) {
      const handleLogin = async () => {
        resetAuth();
        const network = chainMapping[chainId];
        const { nonce } = await getNonce({ network, address: userAddress });
        // const signer = library.getSigner();
        try {
          // const signature = await signer.signMessage(`${userAddress} ${nonce}`);
          const signature = await signMessage(library, userAddress, `${userAddress} ${nonce}`);
          login({ network, address: userAddress, signature })
            .then(() => {
              setContentPath('/campaigns/8c95b848-89a2-4089-8d34-313820dc708e/redemption')
            });
        } catch (e) {
          Logger.error({ message: e.toString() });
        }
      };
      handleLogin();
    }
  }, [library, userAddress]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const contexts = {
    activatingConnector,
    setActivatingConnector,
    web3,
    redreamerProtocolContract,
    redreamerProtocolAddress: get(redreamerProtocolAddr, [chainMapping[chainId]], ''),
    currentChainType: chainMapping[chainId],
    contentPath,
  };

  return (
    <ApplicationContext.Provider value={contexts}>{children}</ApplicationContext.Provider>
  );
};

const useApplicationContext = () => useContext(ApplicationContext);

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default useApplicationContext;
