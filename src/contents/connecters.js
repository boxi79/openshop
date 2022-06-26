import keys from 'lodash/keys';
import map from 'lodash/map';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { chainMapping } from './config';

const chainList = map(keys(chainMapping), (v) => Number(v));

export const injectedConnector = new InjectedConnector({
  supportedChainIds: chainList,
});
export const walletConnector = new WalletConnectConnector({
  rpc: {
    1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', // use MetaMask rpc temporarily
    4: 'https://rinkeby.infura.io/v3/d9044d96244b426fb3bbe68c46c848cb',
    3: 'https://ropsten.infura.io/v3/d9044d96244b426fb3bbe68c46c848cb',
    137: 'https://polygon-rpc.com', // polygon mainnet
    80001: 'https://rpc-mumbai.maticvigil.com', // polygon testnet
  },
  qrcode: true,
});

export const connecterList = ['injected', 'walletConnect'];

export const connecterConfigs = {
  injected: {
    name: 'MetaMask',
    instance: injectedConnector,
  },
  walletConnect: {
    name: 'WalletConnect',
    instance: walletConnector,
  },
};
