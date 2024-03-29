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
const QtyInput: React.FC<IProps> = ({
  value,
  className,
  id,
  name,
  min = 0,
  onChangeHandler,
  onBlurHandler = () => null,
  readonly = false,
}) => {
  return (
    <input
      type='number'
      min={min}
      onKeyDown={(e) =>
        ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()
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

export default QtyInput;
