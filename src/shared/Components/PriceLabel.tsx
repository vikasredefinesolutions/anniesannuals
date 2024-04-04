import React from 'react';

interface IProps {
  className: string;
  price: number | string | undefined;
  deductable?: '-' | '+';
  divCheck?: boolean;
  style?: {};
}

const PriceLabel: React.FC<IProps> = ({
  className,

  price,
  deductable,
  divCheck = true,
  style,
}) => {
  if (divCheck) {
    return (
      <div className={className} style={style}>
        {deductable && deductable}${Number(price || 0).toFixed(2)}
      </div>
    );
  } else {
    return (
      <span className={className} style={style}>
        {deductable && deductable}${Number(price || 0).toFixed(2)}
      </span>
    );
  }
};

export default PriceLabel;
