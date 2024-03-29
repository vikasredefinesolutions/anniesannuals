import React from 'react';

interface IProps {
  salePrice: number;
  msrp: number;
}

const PriceLabelDetails: React.FC<IProps> = ({ salePrice, msrp }) => {
  if (salePrice && salePrice >= msrp) {
    return (
      <div className='text-large-text font-bold mb-[15px]'>
        ${Number(msrp)?.toFixed(2)}
      </div>
    );
  } else {
    return (
      <div className='text-large-text font-bold mb-[15px]'>
        <span
          style={{
            textDecoration: 'line-through',
            fontSize: '22px',
            color: '#9c331c',
          }}
        >
          ${msrp.toFixed(2)}
        </span>
        <span style={{ marginLeft: '10px' }}>
          ${Number(salePrice)?.toFixed(2)}
        </span>
      </div>
    );
  }
};

export default PriceLabelDetails;

// export function getPriceWithMsrpAndSalePriceInDetailPage(
//     salePrice: number,
//     msrp: number,
//   ): any {
//     if (!msrp) return undefined;
//     return salePrice && salePrice >= msrp
//       ? `<div className='text-large-text font-bold mb-[15px]'>${Number(
//           msrp,
//         )?.toFixed(2)}</div>`
//       : `<div className='text-large-text font-bold mb-[15px]'>
//       <span style={{textDecoration:'lineThrough',fontSize:'22px',color:'#9c331c'}}>${msrp.toFixed(
//         2,
//       )}</span>
//       <span style={{marginLeft:'10px'}}>${Number(salePrice)?.toFixed(
//         2,
//       )}</span></div>`;
//   }
