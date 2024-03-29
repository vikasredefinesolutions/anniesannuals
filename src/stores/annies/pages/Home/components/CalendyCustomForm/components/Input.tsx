import { ErrorMessage } from 'formik';
import { useRef } from 'react';

interface _Props {
  label: string;
  isRequired: boolean;
  id?: string;
  name: string;
  autoComplete?: string;
  placeholder?: string;
  value: string | string[] | undefined;
  onChange: (e: any, option?: string) => void;
  onBlur?: (e: any) => void;
  className?: string;
  innerClass?: string;
  inputChildern?: React.ReactNode;
  intrestOptions?: { label: string; value: string }[];
  radioOptions?: { label: string; value: string }[];
  type?: string;
  selectOptions?: {
    id: number;
    label: string;
    value: string;
  }[];
  min?: string;
}
const Input: React.FC<_Props> = ({
  label,
  isRequired,
  id = '',
  autoComplete = '',
  name,
  placeholder = '',
  value,
  onChange,
  className,
  innerClass = '',
  inputChildern,
  intrestOptions = [],
  type = 'text',
  selectOptions = [],
  onBlur = (e: any) => e,
  min,
}) => {
  const dateRef = useRef<HTMLInputElement>(null);

  switch (type) {
    case 'options':
      return (
        <div className='col-span-1'>
          <label
            htmlFor=''
            className='mb-[4px] text-[12px] sm:text-[14px] lg:text-[18px] leading-[14px] sm:leading-[16px] lg:leading-[20px]'
          >
            {label} {isRequired && <span className='text-rose-500'>*</span>}
          </label>
          <div
            className={`mt-[4px] ${
              name == 'asiDistributor' ? 'flex items-center gap-6' : ''
            }`}
          >
            {intrestOptions.map((option, index) => (
              <div
                key={index}
                className={`flex items-center gap-1 ${
                  name !== 'asiDistributor' ? 'mb-[6px]' : ''
                }`}
              >
                <input
                  type='checkbox'
                  value={option.value}
                  checked={
                    value
                      ? name === 'asiDistributor'
                        ? value.toString() === option.value
                        : value.includes(option.value)
                      : false
                  }
                  onChange={(e) => onChange(e, option.value)}
                  id={option.value}
                  name={name}
                />
                <label
                  className='text-[12px] sm:text-[14px] lg:text-[18px] leading-[14px] sm:leading-[16px] lg:leading-[20px]'
                  htmlFor={option.value}
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <ErrorMessage component='p' name={name} className='text-rose-500' />
        </div>
      );
    case 'textarea':
      return (
        <div className='w-full'>
          <div className=''>
            <textarea
              id={id}
              name={name}
              autoComplete={autoComplete}
              rows={4}
              value={value}
              className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
              onChange={onChange}
              placeholder={placeholder}
            ></textarea>
          </div>
          <ErrorMessage component='p' name={name} className='text-rose-500' />
        </div>
      );
    case 'select':
      return (
        <div className='w-full'>
          <div className=''>
            <select
              name={name}
              value={value}
              onChange={onChange}
              autoComplete={autoComplete}
              className='text-medium-text border border-[#ababab] bg-white rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
            >
              <option value={''}>{placeholder}</option>
              {selectOptions.map((option) => {
                if (option.value === value) {
                  return (
                    <option key={option.id} value={option.value} selected>
                      {option.label}
                    </option>
                  );
                }
                return (
                  <option key={option.id} value={option.value}>
                    {option.label}
                  </option>
                );
              })}
            </select>
          </div>

          <ErrorMessage component='p' name={name} className='text-rose-500' />
        </div>
      );
    case 'date':
      return (
        <div className='w-full'>
          <div className='flex flex-wrap items-center justify-between'>
            <input
              id={id}
              name={name}
              autoComplete={autoComplete}
              placeholder={placeholder}
              value={value}
              className='form-input mr-[4px]'
              onChange={(e) => onChange(e)}
              onBlur={onBlur}
              type='date'
              min={min}
              ref={dateRef}
            />

            {inputChildern}
          </div>

          <ErrorMessage component='p' name={name} className='text-rose-500' />
        </div>
      );
    case 'file':
      return (
        <div className='flex items-center justify-between border border-[#a5a5a5] text-medium-text pl-[5px] pr-[5px] pt-[5px] pb-[5px] rounded'>
          <div className='text-medium-text'>{label}</div>
          <div className=''>
            <label
              htmlFor='upload2'
              className='btn-primary text-medium-text inline-flex flex-wrap items-center justify-between pl-[12px] pr-[12px] pt-[8px] pb-[8px]'
            >
              <span className='material-icons-round mr-[5px]'>folder_open</span>
              <span>Upload</span>
            </label>
            <input
              type={type}
              id={id}
              name={name}
              placeholder={placeholder}
              onChange={(e) => onChange(e)}
              className='sr-only'
              accept='.doc,.docx, .xlsx, .xls, .eps, .ai, .pdf, .jpg, .jpeg, .png, .bmp'
            />
          </div>
        </div>
      );
    default:
      return (
        <div className='w-full'>
          <div className=''>
            <input
              id={id}
              name={name}
              autoComplete={autoComplete}
              placeholder={placeholder}
              value={value}
              className='text-medium-text border border-[#ababab] rounded pt-[12px] pb-[12px] pl-[12px] pr-[12px] w-full'
              onChange={(e) => onChange(e)}
              onBlur={onBlur}
              type={type}
            />
            <ErrorMessage component='p' name={name} className='text-rose-500' />
          </div>
        </div>
      );
  }
};

export default Input;
