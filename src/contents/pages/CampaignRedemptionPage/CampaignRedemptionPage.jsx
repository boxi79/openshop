import React, { useState } from 'react';
import { RedemptionForm } from './RedemptionForm';
import Step from './Step';
import {
  StyledContainer,
  StyledGoBack,
  StyledContent,
  StyledNFTDetailContainer,
  StyledImage,
  StyledNFTDetail,
  StyledNFTName,
  StyledNFTDescription,
} from './Styles';

const defaultCurrentStep = {
  step: 0,
  loading: false,
  error: false,
  finished: false,
};

const href = document.location.href;

const nft = {
  isRedeemable: true,
  contractAddress: href.split('/')[5],
  tokenId: Number(href.split('/')[6]),
};

const campaign = {
  redeemAction: 2,
  uuid: '8c95b848-89a2-4089-8d34-313820dc708e',
  recycleAddress: '0x63be1247997473000af4aca6c98fde7972cbf7ba',
  network: 'eth',
}

const CampaignRedemptionPage = () => {
  const [steps, setSteps] = useState({});
  const [currentStep, setCurrentStep] = useState(defaultCurrentStep);

  const indexes = Object.keys(steps);

  return (
    <div>
      <StyledContainer>
        <StyledContent>
          {indexes.map((index) => (
            <Step
              index={Number(index)}
              currentStep={currentStep}
              steps={steps}
            />
          ))}
          <RedemptionForm
            nft={nft}
            campaign={campaign}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            setSteps={setSteps}
          />
        </StyledContent>
      </StyledContainer>
    </div>
  );
};

export default CampaignRedemptionPage;
