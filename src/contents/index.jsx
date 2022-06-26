import ReactDOM from 'react-dom';
import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import createMetaMaskProvider from 'metamask-extension-provider';
import Ethjs from 'ethjs';
import App from './App';


const pluginContainer = document.createElement('div');
pluginContainer.setAttribute('id', 'openshop');
pluginContainer.setAttribute(
  'style',
  'position: relative; height: 72px; margin-top: 1px'
);

const provider = createMetaMaskProvider()

window.ethereum = provider;

const eth = new Ethjs(provider)

provider.on('error', (error) => {
  // Failed to connect to MetaMask, fallback logic.
})

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

document.body.appendChild(pluginContainer);

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
  </Web3ReactProvider>,
  document.getElementById('openshop'),
);