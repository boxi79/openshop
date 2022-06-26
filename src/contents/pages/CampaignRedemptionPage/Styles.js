import styled from 'styled-components';
import color from '../../styles/color';

export const StyledContainer = styled.div`
  padding: 24px;
  background: transparent;
`;

export const StyledGoBack = styled.div`
  color: ${color.mainGreen};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: 48px;
  cursor: pointer;
`;

export const StyledContent = styled.div`
  width: 80%;
  margin: auto;
`;

export const StyledNFTDetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 24px;
  color: white;
  padding: 24px;
`;

export const StyledImage = styled.img`
  width: 50%;
  object-fit: contain;
  background-color: white;
`;

export const StyledNFTDetail = styled.div`
  padding:  0 24px;
`;

export const StyledNFTName = styled.div`
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 24px;
`;

export const StyledNFTDescription = styled.div`
  font-size: 16px;
  font-weight: 400;
`;
