import PropTypes from 'prop-types';
import React from 'react';
import noop from 'lodash/noop';
import styled from 'styled-components';

const StyledContainer = styled.div`
  border-radius: 10px;
  height: 20px;
  width: 20px;
  line-height: 20px;
  color: #030d33;
  background: rgba(255, 255, 255, 0.3);
  text-align: center;
  font-size: 24px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  &:hover {
    opacity: ${({ disabled }) => (disabled ? '0.5' : '0.8')};
  }
`;

export const Close = ({ disabled, onClick }) => (
  <StyledContainer disabled={disabled} onClick={onClick}>&#215;</StyledContainer>
);

Close.propTypes = {
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

Close.defaultProps = {
  onClick: noop,
  disabled: false,
};
