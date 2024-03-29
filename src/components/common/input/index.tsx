interface Props {
  label?: string;
  error?: string;
  register?: any;
  dataTest?: string;
  caption?: string;
  name?: string;
  onChange?: any;
  type: 'text' | 'number' | 'date' | 'email' | 'password' | 'search';
  placeholder?: string;
  className?: string;
  rootClassName?: string;
  autocomplete?: boolean;
  disabled?: boolean;
  isRequired?: boolean;
  onBlur?: any;
  max?: number;
}

function Input({
  label,
  error,
  register = () => {},
  dataTest = 'dataTest',
  autocomplete = true,
  caption,
  rootClassName,
  disabled = false,
  isRequired,
  max,
  ...inputProps
}: Props) {
  const id = inputProps['name'];
  return (
    <div
      className={`w-full pt-3 mt-1 flex flex-col gap-1 relative ${rootClassName}`}
      data-test={`${dataTest}.container`}
    >
      {label && (
        <label
          className='block text-small-text mb-[5px] font-bold uppercase'
          htmlFor={id}
        >
          {label}
          {!isRequired && <span className='text-rose-600'>*</span>}
        </label>
      )}
      <input
        {...inputProps}
        className='form-input'
        style={{ backgroundColor: `${disabled ? 'rgb(220,220,220)' : ''}` }}
        id={id}
        {...register(id)}
        disabled={disabled}
        autoComplete={`${autocomplete ? 'on' : 'off'}`}
        maxLength={max}
      />
      {error && (
        <p className='font-medium text-xs text-gray-darker'>
          {caption}
          <div
            className='h-6 top-full left-0 text-red-500 text-[16px]'
            data-test={`${dataTest}.error`}
          >
            {error || ''}
          </div>
        </p>
      )}
    </div>
  );
}

export default Input;
