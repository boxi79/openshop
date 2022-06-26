import omit from 'lodash/omit';
import { ethers } from 'ethers';
import { Logger } from './api/logger';

export const checkOwnership = async (address, contract, tokenId) => {
  try {
    const owner = await contract.methods.ownerOf(tokenId).call();
    return (owner || '').toLowerCase() === address;
  } catch (e) {
    console.log(e);
    Logger.error({ error: e });
    return false;
  }
};

const getTransaction = async ({
  web3, source, contractAddress, data,
}) => {
  const nonce = await web3.eth.getTransactionCount(source) + 1;
  const gasPrice = await web3.eth.getGasPrice();
  const block = await web3.eth.getBlock('latest');
  const { gasLimit } = block;
  const chainId = await web3.eth.getChainId();

  const transaction = {
    nonce: `0x${nonce.toString(16)}`,
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    from: source,
    value: '0x0',
    data,
    chainId,
  };

  return transaction;
};

const getSafeTransferFrom = ({
  contract, source, destination, tokenId,
}) => {
  const data = contract.methods.safeTransferFrom(source, destination, tokenId);
  const encodedData = data.encodeABI();
  return encodedData;
};

const signTransaction = async (web3, tx, privateKey) => {
  // TODO cannot not got private key, need to check signature methods for different wallet
  const signed = await web3.eth.accounts.signTransaction(tx, privateKey);
  return signed;
};

const qubicSendTransaction = async (web3, tx) => {
  const receipt = web3.eth.sendTransaction(omit(tx, ['gasPrice', 'gasLimit']));
  receipt
    .on('transactionHash', (transactionHash) => console.log('transactionHash:', transactionHash))
    .on('receipt', (recipt) => console.log('recipt:', recipt))
    .on('confirmation', (confirmation) => console.log('confirmation:', confirmation))
    .on('error', (error) => console.log('error:', error));
  return receipt;
};

const sendSignedTransaction = async (web3, signed) => {
  const tx = await web3.eth.sendSignedTransaction(signed.rawTransaction);
  return tx;
};

const metaMaskSendTransaction = async (provider, transaction) => {
  try {
    return await provider.request({
      method: 'eth_sendTransaction',
      params: [transaction],
    });
  } catch (e) {
    return {
      info: 'transaction error',
      error: e,
    };
  }
};

export const recycleToken = async (
  web3, library, contract, source, destination, tokenId,
) => {
  const data = getSafeTransferFrom({
    contract, source, destination, tokenId,
  });
  /* eslint-disable-next-line no-underscore-dangle */
  const contractAddress = contract._address;
  const transaction = await getTransaction({
    web3, source, contractAddress, data,
  });

  if (library.provider && (library.provider.isMetaMask || web3.currentProvider.isWalletConnect)) {
    return metaMaskSendTransaction(library.provider, transaction);
  }
  if ((web3.currentProvider || {}).isQubic) {
    return qubicSendTransaction(web3, transaction);
  }

  const signed = await signTransaction(web3, transaction, source);
  const transactionInfo = await sendSignedTransaction(web3, signed);
  const { transactionHash } = transactionInfo;
  return transactionHash;
};

export const getTokenIds = async (account, contract) => {
  if (!account) return [];
  const tokenCount = await contract.methods.balanceOf(account).call();
  const promises = [];
  for (let i = 0; i < tokenCount; i += 1) {
    promises.push(contract.methods.tokenOfOwnerByIndex(account, i).call());
  }
  const tokenList = await Promise.all(promises);
  return tokenList;
};

export const signMessage = async (library, userAddress, rawMessage) => {
  let signedMessage;
  if (library.provider.wc) {
    try {
      signedMessage = await library.provider.send(
        'personal_sign',
        [ethers.utils.hexlify(ethers.utils.toUtf8Bytes(rawMessage)), userAddress.toLowerCase()],
      );
    } catch (e) {
      Logger.error({ error: e, message: e.toString() });
      throw e;
    }
  } else {
    const signer = library.getSigner();
    try {
      signedMessage = await signer.signMessage(rawMessage);
    } catch (e) {
      Logger.error({ message: e.toString() });
      throw e;
    }
  }
  return signedMessage;
};
