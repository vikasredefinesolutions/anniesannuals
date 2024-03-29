import { ChangeEvent } from 'react';

interface IProps {
  giftCardValue: string;
  giftCouponNameChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  applyGiftCardDiscount: () => void;
  giftCardAmount: number;
  balance: number;
}
const ApplyGiftCard = ({
  giftCardAmount,
  balance,
  giftCardValue,
  applyGiftCardDiscount,
  giftCouponNameChangeHandler,
}: IProps) => {
  return (
    <div className='mb-[20px]' id=''>
      <div className='bg-[#FCFFF5] border border-gray-border rounded-sm p-[30px] mb-[10px] last:mb-0'>
        <div className='pt-[30px]'>
          <div className='flex flex-wrap mx-[-15px]'>
            <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
              <label
                htmlFor='giftCard'
                className='block text-small-text mb-[5px] ml-[15px] font-bold'
              >
                GIFT CARD NUMBER
              </label>
              <input
                id='giftCard'
                name='giftCard'
                placeholder='Enter the Gift Card Number'
                value={giftCardValue}
                onChange={giftCouponNameChangeHandler}
                className='form-input'
              />
            </div>
            <div className='md:w-2/12 w-full px-[15px] mb-[20px]'>
              <div></div>
              <div>
                <button
                  type='button'
                  onClick={applyGiftCardDiscount}
                  className='btn btn-primary uppercase !font-body !rounded-xs mt-[20px]'
                >
                  Apply
                </button>
              </div>
            </div>
            {giftCardAmount !== 0 && (
              <div className='md:w-4/12 w-full px-[15px] mb-[20px] text-right'>
                <p>
                  Used Gift Card Amount:
                  {giftCardAmount.toFixed(2)}
                </p>
                <p>Balance : {balance?.toFixed(2)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyGiftCard;
