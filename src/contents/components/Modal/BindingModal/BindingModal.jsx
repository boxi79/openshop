import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import styled from 'styled-components';
import Modal from '../Modal';
import { connecterList, connecterConfigs } from '../../../connecters';
import useApplicationContext from '../../../providers/applicationContext';
import ConnectButton from '../../ConnectButton';
import color from '../../../styles/color';

console.log(connecterList);

const StyledContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  filter: drop-shadow(-1px 0px 0px ${color.mainGreen})
          drop-shadow(1px 1px 0px ${color.mainGreen})
          drop-shadow(0px 1px 0px ${color.mainGreen})
          drop-shadow(1px -1px 0px ${color.mainGreen});
`;

const StyledTitle = styled.div`
  font-size: 18px;
  color: white;
  text-align: center;
  font-weight: bold
`;

const BindingModal = ({ hasBackDrop, opened, onClose }) => {
  const { activatingConnector, setActivatingConnector } = useApplicationContext();
  const {
    activate, connector, error, active,
  } = useWeb3React();

  useEffect(() => {
    if (active) onClose();
  }, [active, onClose]);

  const handleClose = () => {
    setActivatingConnector(null);
    onClose();
  };

  return (
    <Modal
      hasBackDrop={hasBackDrop}
      opened={opened}
      onClose={handleClose}
      backgroundColor={color.modalBackgroundColor}
      closeColor={color.mainGreen}
      width="30%"
    >
      <StyledTitle>BINDING WALLET</StyledTitle>
      <StyledContainer>
        {connecterList.map((key) => {
          const { name, instance: currentConnector } = connecterConfigs[key];
          const activating = currentConnector === activatingConnector;
          const connected = currentConnector === connector;
          const disabled = !!activatingConnector || connected || !!error;
          return (
            <ConnectButton
              key={key}
              name={name}
              activating={activating}
              connected={connected}
              disabled={disabled}
              onClick={() => {
                setActivatingConnector(currentConnector);
                activate(
                  currentConnector,
                  (e) => {
                    if (e) {
                      console.log(e);
                      setActivatingConnector(undefined);
                    }
                  },
                );
              }}
            />
          );
        })}
      </StyledContainer>
    </Modal>
  );
};

BindingModal.propTypes = {
  hasBackDrop: PropTypes.bool,
  opened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

BindingModal.defaultProps = {
  hasBackDrop: false,
  opened: false,
};

export default BindingModal;
