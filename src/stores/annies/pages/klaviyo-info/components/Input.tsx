'use client';
import { _Values } from '@/features/myAccount/klaviyo-info/controller';
import React from 'react';
import { RegisterOptions } from 'react-hook-form';

interface IProps {
  type?: string;
  label: string;
  value?: string;
  placeHolder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  inputFieldOptions?: {
    name: string;
    options?: RegisterOptions<_Values, any> | undefined;
  };
  error: string | undefined;
}
const KlaviyoInput: React.FC<IProps> = ({
  type = 'text',
  label,
  placeHolder,
  className,
  id,
  value = '',
  disabled = false,
  onChange = () => '',
  inputFieldOptions = { name: '' },
  error,
}) => {
  return (
    <div className='relative mb-[20px]'>
      <label className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'>
        {label}
      </label>
      <div className='relative'>
        <input
          id={id}
          placeholder={placeHolder}
          className={`form-input ${className}`}
          type={type}
          {...inputFieldOptions}
        />
      </div>
      {error && <p className='text-rose-600 pt-1'>{error}</p>}
    </div>
  );
};

export default KlaviyoInput;
