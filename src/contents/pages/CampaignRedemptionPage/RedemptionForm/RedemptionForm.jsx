import PropTypes from 'prop-types';
import React, {
  useEffect, useState, useMemo, useRef,
} from 'react';
import { useWeb3React } from '@web3-react/core';
import { Formik } from 'formik';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import { Logger } from '../../../api/logger';
import { signMessage } from '../../../rpc';
import useApplicationContext from '../../../providers/applicationContext';
import { usePostRedemption } from '../../../api/postRedemption';
import { defaultERC721ABI } from '../../../abi';
import { formConfig } from './formConfig';
import { SizePicker, sizeConfigs } from './SizePicker';
import ErrorModal from './ErrorModal';
import LoadingModal from './LoadingModal';

import {
  StyledForm,
  StyledFieldsContainer,
  StyledInput,
  StyledButtonGroup,
  StyledRedeemButton,
  StyledCancelButton,
  StyledSize,
} from './Styles';

const defaultSize = sizeConfigs[0];

const CampaignRedemptionForm = ({
  nft,
  campaign,
  currentStep,
  setCurrentStep,
  setSteps,
}) => {
  const [error, setError] = useState();
  const formikRef = useRef();
  const [size, setSize] = useState(defaultSize);
  const [isPreview, setPreview] = useState(false);
  const userInputDataSchemaMap = keyBy(formConfig, 'key');
  const {
    library, account: userAddress,
  } = useWeb3React();
  const {
    web3,
    redreamerProtocolContract,
    redreamerProtocolAddress,
  } = useApplicationContext();
  const [formValues, setFormValues] = useState({});
  const [signature, setSignature] = useState();
  const {
    redeemAction, uuid, recycleAddress, network,
  } = campaign;
  const { isRedeemable = false, contractAddress, tokenId } = nft;

  const { postRedemption } = usePostRedemption();

  const errorMessage = `Error happened: campaign:${uuid}, contract:${contractAddress}, tokenId: ${tokenId}, address: ${userAddress}`;

  const { loading } = currentStep;

  const getActionName = () => {
    switch (redeemAction) {
      case 0: {
        return 'Redeem with Mark';
      }
      case 1: {
        return 'Redeem with Transfer';
      }
      case 2: {
        return 'Redeem with Burn';
      }
      default: {
        return 'Redeem with Mark';
      }
    }
  };

  const getRedeemFunc = () => {
    switch (redeemAction) {
      case 0: {
        return async () => {
          await redreamerProtocolContract.methods.redeemWithMark(
            contractAddress, tokenId,
          ).send({ from: userAddress });
        };
      }
      case 1: {
        return async () => {
          await redreamerProtocolContract.methods.redeemWithTransfer(
            contractAddress, tokenId, recycleAddress,
          ).send({ from: userAddress });
        };
      }
      case 2: {
        return async () => {
          await redreamerProtocolContract.methods.redeemWithBurn(
            contractAddress, tokenId,
          ).send({ from: userAddress });
        };
      }
      default: {
        return async () => {
          await redreamerProtocolContract.methods.redeemWithMark(
            contractAddress, tokenId,
          ).send({ from: userAddress });
        };
      }
    }
  };

  const handleCancelPreview = () => {
    setPreview(false);
    setError(null);
    setCurrentStep({
      step: 0,
      loading: false,
      error: false,
      finished: false,
    });
  };

  const steps = useMemo(() => ({
    0: {
      buttonName: 'Review Information',
      description: 'Review and Confirm',
      handle: (values) => {
        setPreview(true);
        setFormValues({ ...values, size: size.value });
        setCurrentStep({
          step: 1,
          loading: false,
          error: false,
          finished: false,
        });
      },
    },
    1: {
      buttonName: 'Sign Message',
      description: 'Sign Message',
      handle: async () => {
        try {
          setCurrentStep({
            step: 1,
            loading: true,
            error: false,
            finished: false,
          });
          const sig = await signMessage(library, userAddress, `campaign_uuid:${uuid},contract_address:${contractAddress},token_id:${tokenId}`);
          setCurrentStep({
            step: 2,
            loading: false,
            error: false,
            finished: false,
          });
          setSignature(sig);
        } catch (e) {
          setCurrentStep({
            step: 1,
            loading: false,
            error: true,
            finished: false,
          });
          Logger.sendLog({ level: 'warn', error: e, message: errorMessage });
          setError(e.message);
        }
      },
    },
    2: {
      buttonName: 'Approve to Transfer',
      description: 'Set Approval',
      handle: async () => {
        try {
          setCurrentStep({
            step: 2,
            loading: true,
            error: false,
            finished: false,
          });
          const nftContract = new web3.eth.Contract(defaultERC721ABI, contractAddress);
          const approval = await nftContract.methods.getApproved(
            tokenId,
          ).call();
          if (approval.toLowerCase() !== redreamerProtocolAddress.toLowerCase()) {
            await nftContract.methods.approve(
              redreamerProtocolAddress, tokenId,
            ).send({ from: userAddress });
          }
          setCurrentStep({
            step: 3,
            loading: false,
            error: false,
            finished: false,
          });
        } catch (e) {
          setCurrentStep({
            step: 2,
            loading: false,
            error: true,
            finished: false,
          });
          Logger.sendLog({ level: 'warn', error: e, message: errorMessage });
          setError(e.message);
        }
      },
    },
    3: {
      buttonName: 'Confirm and Redeem',
      description: getActionName(),
      handle: async () => {
        setCurrentStep({
          step: 3,
          loading: true,
          error: false,
          finished: false,
        });
        await postRedemption({
          network,
          uuid,
          contractAddress,
          tokenId,
          signature,
          userInputData: {
            ...formValues,
          },
        }).then(async (resp) => {
          const redeemFunc = getRedeemFunc();
          try {
            await redeemFunc();
            setCurrentStep({
              step: 3,
              loading: false,
              error: false,
              finished: true,
            });
            const location = {
              pathname: `/campaigns/${uuid}/redemption/${contractAddress}/${tokenId}/success`,
              state: {
                nft, campaign, redemption: resp,
              },
            };
            setPreview(false);
          } catch (e) {
            setCurrentStep({
              step: 3,
              loading: false,
              error: true,
              finished: false,
            });
            Logger.sendLog({ level: 'warn', error: e, message: errorMessage });
            setError(e.message);
          }
        }).catch((e) => {
          setCurrentStep({
            step: 3,
            loading: false,
            error: true,
            finished: false,
          });
          Logger.sendLog({ level: 'warn', error: e, message: errorMessage });
          setError(e.message);
        });
      },
    },
  }), [signature, formValues, size]);

  useEffect(() => {
    setSteps(steps);
  }, [steps]);

  const handleSizeChange = (s) => {
    setSize(s);
  };

  const handleFormSubmit = async (values) => {
    setError(null);
    const step = steps[currentStep.step];
    if (currentStep.step === 0) {
      step.handle(values);
    } else {
      await step.handle(values);
    }
  };

  const getInitialValues = () => {
    const initValues = {};
    formConfig.forEach((schema) => {
      initValues[schema.key] = '';
    });
    return initValues;
  };

  return (
    <>
      <Formik
        ref={formikRef}
        onSubmit={handleFormSubmit}
        initialValues={getInitialValues()}
        validateOnChange={false}
        validate={(values) => {
          const errors = {};
          Object.keys(values).forEach((formKey) => {
            if (get(userInputDataSchemaMap, [formKey, 'required'])) {
              if (!values[formKey]) {
                errors[formKey] = 'Required!';
              }
            }
          });
          return errors;
        }}
      >
        {
          ({
            values = {},
            errors = {},
            touched = {},
            isSubmitting,
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
          }) => (

            <StyledForm
              onSubmit={handleSubmit}
            >
              <StyledFieldsContainer>
                {
                  formConfig.map((schema) => (
                    <StyledInput
                      key={schema.key}
                      placeholder={schema.placeHolder}
                      setFieldValue={setFieldValue}
                      schema={schema}
                      fieldId={schema.key}
                      label={schema.name}
                      required={schema.required}
                      value={values[schema.key]}
                      touched={touched[schema.key]}
                      error={errors[schema.key]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isPreview}
                    />
                  ))
                }
              </StyledFieldsContainer>
              <StyledSize>
                Size (EU)
                <span>*</span>
              </StyledSize>
              <SizePicker
                isPreview={isPreview}
                value={size}
                onChange={handleSizeChange}
              />
              <StyledButtonGroup>
                {
                  isPreview && (
                    <StyledCancelButton onClick={handleCancelPreview}>
                      Cancel
                    </StyledCancelButton>
                  )
                }
                <StyledRedeemButton
                  loading={loading}
                  type="submit"
                  disabled={(isSubmitting || !isRedeemable) && false}
                >
                  {get(steps, [currentStep.step, 'buttonName'])}
                </StyledRedeemButton>
              </StyledButtonGroup>
              <ErrorModal
                opened={!!error}
                onClose={() => setError(undefined)}
                error={error}
                handleRetry={() => {
                  if (currentStep.step !== 0) {
                    handleFormSubmit();
                  }
                }}
              />
            </StyledForm>
          )
        }
      </Formik>
      <LoadingModal
        opened={loading}
      />
    </>
  );
};

CampaignRedemptionForm.propTypes = {
  currentStep: PropTypes.shape({
    step: PropTypes.number,
    loading: PropTypes.bool,
    error: PropTypes.bool,
    finished: PropTypes.bool,
  }).isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  setSteps: PropTypes.func.isRequired,
};

CampaignRedemptionForm.defaultProps = {
};

export default CampaignRedemptionForm;
