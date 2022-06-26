import styled from 'styled-components';
import color from '../../../../styles/color';

export const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : '100%')};
  margin-bottom: 12px;

  label {
    margin-bottom: 6px;
    text-align: right;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);

    span {
      color: ${color.mainGreen};
    }
  }
`;

export const StyledInputWithClearWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  align-items: center;
`;

export const StyledInputContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  input {
    margin-right: -20px;
    color: white;
    height: 24px;
    line-height: 24px;
    width: 100%;
    background: none;
    border: none;
    outline: none;

    &:disabled {
      color: rgba(255, 255, 255, 0.4);
      cursor: not-allowed;
    }


    &:-webkit-autofill,
    &:-webkit-autofill:hover, 
    &:-webkit-autofill:focus, 
    &:-webkit-autofill:active {
      background: none;
      color: white;
      caret-color: white;
      -webkit-box-shadow: 0 0 0 30px #030d33 inset !important;
      -webkit-text-fill-color: white !important;
    }
  }
  .description {
    height: 14px;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.4px;
    color: rgba(255, 255, 255, 0.7);
  }
  .error {
    color: red;
    height: 14px;
  }
`;
