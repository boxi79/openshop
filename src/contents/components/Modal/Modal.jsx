import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import isNil from 'lodash/isNil';
import { createPortal } from 'react-dom';
import { XS_QUERY } from '../../breakpoints';
import color from '../../styles/color';

const StyledBackDrop = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  opacity: ${({ hasBackDrop }) => (hasBackDrop ? 0.75 : 0)};
  z-index: 10;
  transition: opacity 0.3s;
`;

const StyledContainer = styled.div`
  position: fixed;
  width: ${({ width }) => {
    if (!isNil(width)) {
      if (String(width).includes('%')) return width;
      return `${width}px`;
    }
    return '100%';
  }};
  max-height: 90%;
  max-width: 100%;
  min-width: 300px;
  left: 50%;
  top: 50%;
  bottom: auto;
  right: auto;
  padding: 15px;
  transform: translate(-50%, -50%);
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: solid 1px ${color.mainGreen};
  box-shadow: 0 0 10px rgba(100, 100, 100, 0.7);
  overflow-x: auto;
  overflow-y: auto;
  z-index: 15;

  @media ${XS_QUERY} {
    width: 90%;
  }
`;

const StyledCloseButton = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  color: ${({ closeColor }) => closeColor};
  cursor: pointer;
`;

let modalNode;

if (typeof window !== 'undefined') {
  modalNode = document.querySelector('body > div.modal-container');
  if (!modalNode) {
    modalNode = document.createElement('div');
    modalNode.classList.add('modal-container');
  }
  document.body.appendChild(modalNode);
}

const Modal = ({
  className,
  hasBackDrop,
  backgroundColor,
  closeColor,
  opened,
  showCloseNButton,
  onClose,
  width,
  children,
}) => {
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);
  return (
    opened
    && modalNode
    && createPortal(
      <>
        <StyledBackDrop hasBackDrop={hasBackDrop} onClick={onClose} />
        <StyledContainer className={className} width={width} backgroundColor={backgroundColor}>
          {showCloseNButton && (
            <StyledCloseButton
              closeColor={closeColor}
              onClick={onClose}
            >
              &#x2715;
            </StyledCloseButton>
          )}
          {children}
        </StyledContainer>
      </>, modalNode,
    )
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  hasBackDrop: PropTypes.bool,
  backgroundcolor: PropTypes.string,
  opened: PropTypes.bool,
  showCloseNButton: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  className: undefined,
  hasBackDrop: true,
  backgroundColor: '#fff',
  closeColor: '#000',
  opened: false,
  showCloseNButton: true,
  onClose: () => { },
  width: undefined,
};

export default Modal;
