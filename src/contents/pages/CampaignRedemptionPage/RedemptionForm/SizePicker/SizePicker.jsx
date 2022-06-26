import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';
import { sizeConfigs } from './sizeConfigs';
import {
  StyledContainer,
  StyledSizeContainer,
} from './Styles';

const SizePicker = ({ isPreview, onChange, value }) => {
  const getHandleClick = (sizeConfig) => () => {
    if (!isPreview) onChange(sizeConfig);
  };

  return (
    <StyledContainer>
      {
        sizeConfigs.map((sizeConfig) => (
          <StyledSizeContainer
            key={sizeConfig.key}
            onClick={getHandleClick(sizeConfig)}
            active={value.value === sizeConfig.value}
            disabled={isPreview}
          >
            {sizeConfig.name}
          </StyledSizeContainer>
        ))
      }
    </StyledContainer>
  );
};

SizePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.shape({
    value: PropTypes.number,
  }),
  isPreview: PropTypes.bool,
};

SizePicker.defaultProps = {
  onChange: noop,
  value: {},
  isPreview: false,
};

export default SizePicker;
