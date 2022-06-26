import styled from 'styled-components';
import color from '../../../../styles/color';

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 24px;
`;

export const StyledSizeContainer = styled.div`
  font-size: 16px;
  text-align: center;
  margin: 6px;
  width: 100px;
  padding: 4px 10px;
  color: ${({ active }) => (active ? 'black' : 'white')};
  background-color: ${({ active, disabled }) => {
    if (active) {
      return color.mainGreen;
    }
    if (disabled) {
      return '#353535;';
    }
    return '#124e5c';
  }};
  font-weight: ${({ active }) => (active ? 700 : 400)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  
  &:hover {
    opacity: ${({ disabled }) => (disabled ? 1 : 0.8)};
  }

  sup {
    font-size: 6px;
  }

  sub {
    font-size: 6px;
  }
`;
