import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import noop from 'lodash/noop';
import Spinner from '../../components/Spinner';
import color from '../../styles/color';

const StyledContainer = styled.div`
  display: flex;
  color: white;
  align-items: center;
  font-size: 16px;
  height: 24px;
  height: 40px;
  line-height: 40px;
  font-weight: 700;
  font-size: 32px;
`;

const StyledStateIconContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: 24px;
`;

const StyledDescription = styled.div`
  margin-left: 12px;
  height: 24px;
  line-height: 24px;
  color: ${({ isError, isFinished }) => {
    if (isError) return '#ff75ff';
    if (isFinished) return color.mainGreen;
    return 'white';
  }}
`;

const Step = ({ currentStep, steps, index }) => {
  const step = get(steps, index);
  const {
    loading,
    error,
    finished,
    step: stepIndex,
  } = currentStep;
  const { description } = step;
  const isLoading = (stepIndex === index) && loading;
  const isFinished = finished || stepIndex > index;
  const isError = (stepIndex === index) && error;
  return (
    <StyledContainer>
      <StyledStateIconContainer>
        {isLoading && <Spinner color={color.yellow} style={{ height: '24px', marginLeft: '-6px' }} />}
        {!isFinished && !isError && <div>*</div>}
        {isFinished && (
          <span role="img" aria-label="check">
            ✅
          </span>
        )}
        {isError && (
          <span role="img" aria-label="check">
            ❌
          </span>
        )}
      </StyledStateIconContainer>
      <StyledDescription isFinished={isFinished} isError={isError}>
        {description}
      </StyledDescription>
    </StyledContainer>
  );
};

Step.propTypes = {
  index: PropTypes.oneOf([1, 2, 3]).isRequired,
  steps: PropTypes.objectOf(PropTypes.shape({
    buttonName: PropTypes.string,
    description: PropTypes.string,
    handle: noop,
  })).isRequired,
  currentStep: PropTypes.shape({
    step: PropTypes.oneOf([1, 2, 3]),
    loading: PropTypes.bool,
    error: PropTypes.bool,
    finished: PropTypes.bool,
  }).isRequired,
};

export default Step;
