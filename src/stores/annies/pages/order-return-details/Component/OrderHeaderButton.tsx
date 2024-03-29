import React, { SetStateAction } from 'react';

interface IProps {
  openModel?: () => void;
  textToShow: string;
  setSelectedOrder: React.Dispatch<SetStateAction<string>>;
  orderNumber: string;
  cancelOrReturn: 'CANCEL' | 'RETURN';
}

const OrderHeaderButton: React.FC<IProps> = ({
  openModel,
  textToShow,
  setSelectedOrder,
  orderNumber,
  cancelOrReturn,
}) => {
  return (
    <button
      onClick={() => {
        if (cancelOrReturn === 'CANCEL') {
          openModel && openModel();
          setSelectedOrder(orderNumber);
        } else {
        }
      }}
      className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center !border-[#634B91] !text-[#634B91]'
    >
      <svg
        id='Group_80'
        data-name='Group 80'
        xmlns='http://www.w3.org/2000/svg'
        width='17'
        height='17'
        viewBox='0 0 17 17'
      >
        <path
          id='Path_26'
          data-name='Path 26'
          d='M2.462,2.462a8.635,8.635,0,0,1,12.076,0,8.635,8.635,0,0,1,0,12.076,8.635,8.635,0,0,1-12.076,0A8.635,8.635,0,0,1,2.462,2.462Zm1.524,8.91L6.859,8.5,3.986,5.628,5.628,3.986,8.5,6.859l2.872-2.872,1.641,1.641L10.141,8.5l2.872,2.872-1.641,1.641L8.5,10.141,5.628,13.014Z'
          fill='#634b91'
          fill-rule='evenodd'
        ></path>
      </svg>
      <span>{textToShow} Order</span>
    </button>
  );
};

export default OrderHeaderButton;
