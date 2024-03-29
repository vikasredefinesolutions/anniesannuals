/* eslint-disable @next/next/no-img-element */
import { KeyboardEvent } from 'react';

interface _InputProps {
  additionalClass: string;
  label: string;
  type: 'text' | 'number' | 'password';
  name: string;
  required: boolean;
  length?: number;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  error: boolean;
  touched: boolean;
  readonly?: boolean;
  creditCard?: boolean;
  autoComplete: string;
  placeHolder?: string;
  children?: React.ReactNode;
  errorMsg?: string;
}
export const CheckoutTextInput: React.FC<_InputProps> = ({
  children,
  additionalClass,
  type,
  name,
  onChange,
  value,
  onBlur,
  label,
  length = 200,
  required,
  touched,
  error,
  placeHolder,
  autoComplete,
  readonly = false,
  creditCard = false,
  errorMsg = '',
}) => {
  const right = required && touched && error === null;
  const wrong = required && error;

  const phoneNumberCheck = (event: KeyboardEvent<HTMLInputElement>) => {
    if (name === 'phone') {
      if (
        ![
          'Tab',
          'Backspace',
          '0',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
        ].includes(event.key)
      )
        return event.preventDefault();
    }
    return (
      ['.'].includes(event.key) && name !== 'email' && event.preventDefault()
    );
  };
  return (
    <>
      <input
        name={name}
        type={type}
        value={value}
        readOnly={readonly}
        placeholder={placeHolder}
        onBlur={onBlur}
        onKeyDown={phoneNumberCheck}
        maxLength={length}
        onChange={onChange}
        className={`form-input ${wrong ? '!border-rose-600' : ''}`}
        autoComplete={autoComplete}
        onContextMenu={(e) => {
          if (creditCard) {
            e.preventDefault();
            return;
          }
        }}
      />
      {children}
      {errorMsg && <span className='text-rose-600 ml-[15px]'>{errorMsg}</span>}
    </>
  );
};

interface _SelectProps {
  additionalClass: string;
  label: string;
  name: string;
  required: boolean;
  value: string | number;
  options: {
    name: string;
    id: number | string;
  }[];
  initialOption: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLSelectElement, Element>) => void;
  // setFieldValue: (
  //   field: string,
  //   value: any,
  //   shouldValidate?: boolean | undefined,
  // ) => void;
  valid: boolean;
  inValid: boolean;
  disabled: boolean;
  autoComplete: string;
  errorMsg?: string;
}

export const CheckoutSelectInput: React.FC<_SelectProps> = ({
  name,
  label,
  options,
  value,
  required,
  onBlur,
  onChange,
  valid,
  inValid,
  disabled,
  initialOption,
  autoComplete,
  additionalClass,
  errorMsg = '',
}) => {
  return (
    <>
      <select
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
        autoComplete={autoComplete}
        onBlur={onBlur}
        className={`form-input ${inValid ? '!border-rose-600' : ''}`}
      >
        <option value={''}>{initialOption}</option>
        {options?.map((option) => {
          if (option.name === value) {
            return (
              <option key={option.id} value={option.name} selected>
                {option.name}
              </option>
            );
          }
          return (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </select>{' '}
      {errorMsg && <span className='text-rose-600 ml-[15px]'>{errorMsg}</span>}
    </>
  );
};

export const CheckoutCreditCardInput: React.FC<{
  name: string;
  value: string;
  valid: boolean;
  inValid: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  autoComplete: string;
}> = ({ name, value, onBlur, onChange, valid, inValid, autoComplete }) => {
  const numberCheck = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      ![
        'Tab',
        'Backspace',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ].includes(event.key)
    ) {
      return event.preventDefault();
    }
  };

  return (
    <>
      <input
        name={name}
        value={value}
        onBlur={onBlur}
        maxLength={2}
        onKeyDown={numberCheck}
        onChange={onChange}
        autoComplete={autoComplete}
        className={`form-input ${inValid ? '!border-rose-600' : ''}`}
      />
    </>
  );
};
