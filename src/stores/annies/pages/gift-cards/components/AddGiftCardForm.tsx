import Input from '@/components/common/input';
import { useEffect } from 'react';

interface GiftCardProps {
  onCancelClick: () => void;
  isGiftVoucher: boolean;
  register: any;
  errors: any;
  handleSubmit: any;
  onSubmit: any;
  errorMessage: any;
  reset: any;
}
const AddGiftCard: React.FC<GiftCardProps> = ({
  onCancelClick,
  isGiftVoucher,
  register,
  errors,
  handleSubmit,
  onSubmit,
  errorMessage,
  reset,
}) => {
  useEffect(() => {
    reset({ isGiftCardVoucher: isGiftVoucher });
  }, []);

  return (
    <>
      <div className='text-medium-text mb-[20px] font-bold font-sub'>
        {isGiftVoucher ? 'Add a Gift Voucher' : 'Add a Gift Card'}
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='max-w-md'>
          <span className='mb-1 text-rose-500 absolute top-full left-0'>
            {errorMessage}
          </span>
          <div className='w-full mb-[20px]'>
            <Input
              label='16-DIGIT CODE'
              type='text'
              name='serialNo'
              register={register}
              placeholder='Enter the 16 digit number on the card'
              error={errors?.serialNo?.message}
            />
          </div>
          {/* {!isGiftVoucher && (
            <div className='w-full mb-[20px]'>
              <Input
                label='4-DIGIT PIN'
                type='text'
                name='pin'
                register={register}
                placeholder='Enter the 4 digit pin number'
                error={errors?.pin?.message}
              />
            </div>
          )} */}
        </div>
        <div className='flex gap-x-[15px]'>
          <button
            type='submit'
            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
          >
            {isGiftVoucher ? 'SAVE GIFT VOUCHER' : 'SAVE GIFT CARD'}
          </button>
          <button
            type='button'
            className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
            onClick={() => {
              onCancelClick();
              reset();
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </>
  );
};
export default AddGiftCard;
