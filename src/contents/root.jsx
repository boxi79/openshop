import React, { useState } from 'react';
import styled from 'styled-components';
import useApplicationContext from './providers/applicationContext';
import { BindingModal } from './components/Modal/BindingModal';
import Modal from './components/Modal';

import { CampaignRedemptionPage } from './pages/CampaignRedemptionPage';

const StyledButton = styled.button`
  height: 108px;
  font-size: 48px;
  background: #80ff00;
  position: fixed;
  top: 50%;
  right: 20%;
  z-index: 1;
  padding: 3px 6px;
  font-weight: bold;
`;

console.log('fuck');
const Root = () => {
  const [opened, setOpened] = useState(false);
  const [redeemModal, setRedeemModal] = useState(true);
  const { contentPath } = useApplicationContext();

  const showRedemptionForm = contentPath === '/campaigns/8c95b848-89a2-4089-8d34-313820dc708e/redemption';

  const handleModalClose = () => {
    setOpened(false);
  };

  return (
    <>
      <StyledButton onClick={() => setOpened(true)}>REDEEM</StyledButton>
      {showRedemptionForm && (
        <Modal
          backgroundColor="black"
          opened={redeemModal}
          onClose={() => { setRedeemModal(false) }}
        >
          <CampaignRedemptionPage />
        </Modal>
      )}
      <BindingModal
        hasBackDrop
        opened={opened}
        onClose={handleModalClose}
      />
    </>
  )
};

export default Root;
