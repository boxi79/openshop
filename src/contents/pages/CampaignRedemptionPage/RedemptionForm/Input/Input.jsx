import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React from 'react';

import { Close } from './Close';
import {
  StyledFieldContainer,
  StyledInputContainer,
  StyledInputWithClearWrapper,
} from './Styles';

const Input = ({
  disabled,
  className,
  setFieldValue,
  fieldId,
  label,
  required,
  error,
  type,
  onChange,
  onBlur,
  touched,
  value,
  placeholder,
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  const handleClear = () => {
    setFieldValue(fieldId, '');
  };

  return (
    <StyledFieldContainer className={className}>
      <label htmlFor={fieldId}>
        {label}
        <span>
          {required && '*'}
        </span>
      </label>
      <StyledInputContainer>
        <StyledInputWithClearWrapper>
          <input
            id={fieldId}
            type={type}
            name={fieldId}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
          />
          {value && (<Close disabled={disabled} onClick={handleClear} />)}
        </StyledInputWithClearWrapper>
        <div className="error">{error && touched && error}</div>
      </StyledInputContainer>
    </StyledFieldContainer>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  fieldId: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.string,
  touched: PropTypes.bool,
  placeholder: PropTypes.string,
  setFieldValue: PropTypes.func,
  disabled: PropTypes.bool,
};

Input.defaultProps = {
  className: undefined,
  fieldId: '',
  label: '',
  required: false,
  error: undefined,
  type: 'text',
  value: undefined,
  onChange: noop,
  onBlur: noop,
  touched: false,
  placeholder: undefined,
  setFieldValue: noop,
  disabled: false,
};

export default Input;
