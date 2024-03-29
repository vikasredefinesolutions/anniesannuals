import React from 'react';

interface IProps {
  className: string;
  price: number | string | undefined;
  deductable?: '-' | '+';
  divCheck?: boolean;
}

const PriceLabel: React.FC<IProps> = ({
  className,
  price,
  deductable,
  divCheck = true,
}) => {
  if (divCheck) {
    return (
      <div className={className}>
        {deductable && deductable}${Number(price || 0).toFixed(2)}
      </div>
    );
  } else {
    return (
      <span className={className}>
        {deductable && deductable}${Number(price || 0).toFixed(2)}
      </span>
    );
  }
};

export default PriceLabel;
