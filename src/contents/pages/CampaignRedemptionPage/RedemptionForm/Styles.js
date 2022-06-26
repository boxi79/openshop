import styled from 'styled-components';
import color from '../../../styles/color';
import Button from '../../../components/Button';
import { Input } from './Input';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

export const StyledFieldsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const StyledInput = styled(Input)`
  background-color: rgb(0, 0, 0, 0);
  &&& {
    width: calc(50% - 12px);
  } 
  
  &:nth-child(2n - 1) {
    margin-right: 24px;
  }
`;

export const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
`;

export const StyledRedeemButton = styled(Button)`
  text-transform: uppercase;
  height: 36px;
  font-size: 16px;
  border: 1px solid ${color.mainGreen};
  color: ${color.mainGreen};
  font-weight: bold;
  padding: 0 24px;
  width: fit-content;

  &:disabled {
    cursor: not-allowed;
    background: ${color.gray};
    color: white;
  }
`;

export const StyledCancelButton = styled(Button)`
  text-transform: uppercase;
  margin-right: 24px;
  border: 1px solid rgb(255, 255, 255, 0.5);
  color: rgb(255, 255, 255, 0.5);
`;

export const StyledError = styled.div`
  margin-top: 12px;
  color: red;
  width: 100%;
  text-align: right;
`;

export const StyledSize = styled.div`
  width: 100%;
  text-align: left;
  margin-bottom: 6px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  span {
    color: ${color.mainGreen};
  }
`;

export const StyledStepContainer = styled.div``;
