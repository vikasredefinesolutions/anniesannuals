interface Props {
  label?: string;
  error?: string;
  register?: any;
  name?: string;
  id?: string | number;
  checked?: boolean;
  fullWidth?: boolean;
  onChange?: any;
  type: 'checkbox' | 'radio';
  className?: string;
  rootClassName?: string;
  rootClassNameLabel?: string;
}

function KlaviyoCheckBox({
  label,
  error,
  register,
  rootClassName,
  rootClassNameLabel,
  className,
  fullWidth = true,
  ...inputProps
}: Props) {
  const id = inputProps['name'];
  return (
    <div
      className={`${
        fullWidth ? 'w-full' : ''
      } items-start justify-start gap-2 relative flex ${rootClassName}`}
    >
      <input
        className={`box-border mt-1 outline-none bg-gray-light rounded border border-solid border-gray-dark focus:ring-offset-0 focus:ring-0 focus:border-gray-dark ${className}`}
        id={id}
        {...(register && { ...register(id) })}
        {...inputProps}
      />
      {label && (
        <label
          className={`text-black-light text-sm ${rootClassNameLabel}`}
          htmlFor={id}
        >
          {label}
        </label>
      )}
      {error && (
        <div className='h-6 absolute top-full left-0 text-red-500 text-[16px]'>
          {error}
        </div>
      )}
    </div>
  );
}

export default KlaviyoCheckBox;
