import React from 'react';
interface IProps {
  onChangeHandler: (value: string | number) => void;
  className: string;
  onBlurHandler?: (value: string | number) => void;
  value: string | number;
  id?: string;
  name: string;
  min?: number;
  readonly?: boolean;
}
const PriceInput: React.FC<IProps> = ({
  min,
  name,
  className,
  value,
  id,
  readonly = false,
  onChangeHandler,
  onBlurHandler = () => null,
}) => {
  return (
    <input
      type='number'
      min={min}
      onKeyDown={(e) =>
        ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
      }
      name={name}
      onChange={(e) => onChangeHandler(e.target.value)}
      onBlur={(e) => onBlurHandler(e.target.value)}
      className={className}
      value={value}
      id={id}
      readOnly={readonly}
    />
  );
};

export default PriceInput;
