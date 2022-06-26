import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import color from '../../../styles/color';

const StyledModal = styled(Modal)`
  border: 1px solid ${color.mainGreen};
`;

const StyledTitle = styled.div`
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  color: black;
  margin-bottom 24px;
`;

const StyledDescription = styled.div`
  font-size: 16px;
  margin-bottom 24px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  border: 1px solid ${color.mainGreen};
`;

const ErrorModal = ({
  opened,
  onClose,
  error,
  handleRetry,
}) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <StyledModal
      hasBackDrop
      opened={opened}
      onClose={handleClose}
      closeColor={color.mainGreen}
      width="30%"
      backgroundColor="#ff00db"
    >
      <StyledTitle>Error</StyledTitle>
      <StyledDescription>{error}</StyledDescription>
      <StyledButton onClick={handleRetry}>Retry</StyledButton>
    </StyledModal>
  );
};

ErrorModal.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleRetry: PropTypes.func,
};

ErrorModal.defaultProps = {
  opened: false,
  error: undefined,
  handleRetry: noop,
};

export default ErrorModal;
