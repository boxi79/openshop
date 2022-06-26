import styled from 'styled-components';
import Button from '../Button';
// import color from '../../styles/color';

export const StyledButton = styled(Button)`
  position: relative;
  height: 48px;
  padding-left: 24px;
  box-sizing: border-box;
  font-weight: bold;
  border-color: ${({ activating, connected }) => {
    if (activating) {
      return 'orange';
    }
    if (connected) {
      return 'green';
    }
    return 'unset';
  }};
  cursor: ${({ disabled }) => (disabled ? 'unset' : 'pointer')};

  margin: 0 36px 36px 36px;

  &:not(:last-child) {
    margin-bottom: 36px;
  }
`;

export const StyledContent = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  height: 100%;
  align-items: center;
  color: black;
  padding: 3px;
`;
