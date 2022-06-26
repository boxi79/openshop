import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import color from '../../styles/color';
import Spinner from '../Spinner';

const StyledButton = styled.button`
  padding: 3px;
  height: ${({ height }) => height}px;
  display: inline-block;
  background: ${color.buttonBackgroundColor};
  color: ${({ fontColor }) => fontColor};
  border-color: ${color.mainGreen};
  cursor: pointer;
  width: ${({ width }) => (width ? `${width}px` : 'unset')};
  &:hover {
    opacity: 0.9;
  }
  padding: 0 24px;

  &:disabled {
    cursor: not-allowed;
    background: ${color.gray};
    color: white;
    display: flex;
    align-items: center;
  }
`;

const Button = ({
  className,
  children,
  height,
  hoverColor,
  hoverBackgroundColor,
  isGradient,
  loading,
  disabled,
  fontColor,
  ...props
}) => (
  <StyledButton
    className={className}
    height={height}
    hoverBackgroundColor={hoverBackgroundColor}
    hoverColor={hoverColor}
    isGradient={isGradient}
    disabled={disabled || loading}
    fontColor={fontColor}
    {...props}
  >
    {loading ? (<Spinner color={color.mainGreen} style={{ height: '24px' }} />) : children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node,
  hoverColor: PropTypes.string,
  hoverBackgroundColor: PropTypes.string,
  fontColor: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  isGradient: PropTypes.bool,
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: undefined,
  hoverColor: undefined,
  hoverBackgroundColor: undefined,
  fontColor: 'white',
  height: 36,
  width: undefined,
  isGradient: false,
  className: undefined,
  loading: false,
  disabled: false,
};

export default Button;
