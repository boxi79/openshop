import PropTypes from 'prop-types';
import styled from 'styled-components';
import React from 'react';
import Modal from '../../../components/Modal';
// import loadingAnimation from '../../../assets/loadingAnimation.gif';
// import loadingLogo from '../../../assets/loadingLogo.svg';

const StyledModal = styled(Modal)`
  width: calc(100vw);
  height: 225px;
  padding: 0;
  opacity: 0.7;
  background: linear-gradient(180deg, rgba(16, 77, 51, 0.7) 0%, rgba(27, 68, 97, 0.7) 100%);
  backdrop-filter: blur(7px);
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 36px 48px;
`;

const StyledAnimationContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLoading = styled.div`
  font-family: 'StretchPro';
  color: #ffff00;
  font-weight: 400;
  font-size: 24px;
  line-height: 24px;
  text-transform: uppercase;
  margin-bottom: 24px;
  text-shadow: 4px 4px 0px #926c18;
`;

const LoadingModal = ({
  opened,
}) => (
  <StyledModal
    opened={opened}
    showCloseNButton={false}
  >
    <StyledContainer>
      <StyledLoading>
        Loading...
      </StyledLoading>
    </StyledContainer>
  </StyledModal>
);

LoadingModal.propTypes = {
  opened: PropTypes.bool,
};

LoadingModal.defaultProps = {
  opened: false,
};

export default LoadingModal;
