import Input from '@/components/common/input';
import PriceLabel from '@/shared/Components/PriceLabel';
import React from 'react';

interface GiftCardData {
  id: number;
  seName: string;
  storeId: number;
  name: string;
  description: string;
  shortDescription: string;
  ourCost: string;
  salePrice: string;
  sku: string;
  imageName: string;
  giftCardEnddate: string;
}
interface GiftCardDetailsProps {
  register: any;
  errors: any;
  handleSubmit: any;
  onSubmit: any;
  errorMessage: any;
  GiftCardData?: GiftCardData;
}

const AddDiftCardDetails: React.FC<GiftCardDetailsProps> = ({
  errorMessage,
  errors,
  handleSubmit,
  onSubmit,
  register,
  GiftCardData,
}) => {
  return (
    <div className='max-w-4xl mx-auto mb-[30px]'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-wrap mx-[-15px] '>
          <span className='mb-1 text-rose-500 absolute top-full left-0'>
            {errorMessage}
          </span>
          <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
            <Input
              type='text'
              label='RECIPIENT FIRST NAME'
              name='firstName'
              placeholder='Enter your firstname'
              register={register}
              error={errors?.firstName?.message}
            />
          </div>
          <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
            <Input
              type='text'
              label='RECIPIENT LAST NAME'
              name='lastName'
              placeholder='Enter your lastname'
              register={register}
              error={errors?.lastName?.message}
            />
          </div>
          <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
            <Input
              type='email'
              label='EMAIL'
              name='email'
              placeholder='Enter Your email'
              register={register}
              error={errors?.email?.message}
            />
          </div>
          <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
            <Input
              type='text'
              label='EMAIL SUBJECT'
              name='subjectLine'
              isRequired
              register={register}
              error={errors?.subjectLine?.message}
            />
          </div>
          <div className='w-full px-[15px] mb-[20px]'>
            <label
              htmlFor='message'
              className='block text-small-text mb-[5px] font-bold uppercase'
            >
              Message to Gift Card recipient (0/100 character limit)
            </label>
            <textarea
              id='giftMessage'
              name='message'
              cols={30}
              rows={5}
              placeholder='Type Your Message here...'
              {...register('message')}
              className='group inline-flex items-center justify-between text-default-text bg-transparent w-full px-2 py-3 leading-none border border-primary rounded-xs'
            />
            {errors?.message?.message && (
              <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                {errors.message.message}
              </div>
            )}
          </div>
        </div>

        <div className='w-full px-[15px] mb-[20px]'>
          <div className='text-large-text font-bold my-[20px]'>
            <PriceLabel
              price={GiftCardData?.salePrice as string}
              className=''
            />
          </div>
        </div>
        <div className='w-full px-[15px] mb-[20px]'>
          <div className='mb-[30px] flex flex-wrap gap-[20px]'>
            <div>
              <button
                type='submit'
                className='btn btn-primary btn-md uppercase !font-body !rounded-xs'
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDiftCardDetails;
