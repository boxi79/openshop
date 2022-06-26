import PropTypes from 'prop-types';
import React from 'react';
import Spinner from '../Spinner';
import { StyledButton, StyledContent } from './Styles';
import color from '../../styles/color';

const ConnectButton = ({
  activating, connected, disabled, onClick, name,
}) => (
  <StyledButton
    disabled={disabled}
    hoverColor={color.purple}
    hoverBackgroundColor={color.yellow}
    onClick={() => onClick()}
  >
    <StyledContent>
      {activating && <Spinner color="black" style={{ height: '25%', marginLeft: '-6px' }} />}
      {connected && (
        <span role="img" aria-label="check">
          ✅
        </span>
      )}
    </StyledContent>
    {name}
  </StyledButton>
);

ConnectButton.propTypes = {
  activating: PropTypes.bool,
  connected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
};

ConnectButton.defaultProps = {
  activating: false,
  connected: false,
  disabled: false,
  onClick: () => {},
  name: undefined,
};

export default ConnectButton;
