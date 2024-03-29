'use client';
import Input from '@/components/common/input';
import CustomLink from '@/shared/Components/CustomLink';
import Image from '@/shared/Components/Image';
import PriceLabel from '@/shared/Components/PriceLabel';
import React, { useEffect } from 'react';

interface GiftCardListingProps {
  productId: number;
  storeId: number;
  name: string;
  seName: string;
  description: string;
  shortDescription: string;
  sku: string;
  image: string;
  msrp: number;
  imap: number;
  salePrice: number;
  lowPrice: number;
  customFields: any[];
}
interface GetStateListProps {
  id: number;
  name: string;
}
interface GiftCardDetailsProps {
  register: any;
  errors: any;
  setValue: any;
  handleSubmit: any;
  onSubmit: any;
  errorMessage: any;
  giftCardData?: any;
  giftCardListingData?: GiftCardListingProps[];
  watch: any;
  getStateList: GetStateListProps[];
  zipCodeHandler: (value: string) => void;
  updateCity: string;
  updateState: string;
}
const AddGiftCertificate: React.FC<GiftCardDetailsProps> = ({
  errorMessage,
  errors,
  handleSubmit,
  setValue,
  onSubmit,
  register,
  giftCardListingData,
  watch,
  getStateList,
  updateCity,
  updateState,
  zipCodeHandler,
}) => {
  const eGiftCardValue = watch('eGiftCardValue');
  const mailGiftCardValue = watch('mailGiftCardValue');
  const imageText = watch('imageText');
  const zipCodeValue = watch('zipCode');
  const message = watch('message');

  const handleDropdownChange = (value: any, type: string) => {
    if (type === 'eGiftCardValue') {
      setValue('imageText', '');
      setValue('mailGiftCardValue', '');
      setValue('address1', '');
      setValue('address2', '');
      setValue('city', '');
      setValue('state', '');
      setValue('zipCode', '');
    } else {
      setValue('eGiftCardValue', '');
    }
  };

  useEffect(() => {
    if (zipCodeValue) {
      zipCodeHandler(zipCodeValue);
    }
    setValue('city', updateCity);
    setValue('state', updateState);
  }, [zipCodeValue, updateCity, updateState]);

  const giftCardAmount =
    giftCardListingData?.find(
      (data) =>
        data.productId == (+(eGiftCardValue || mailGiftCardValue) as any),
    )?.salePrice || '';

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-12 gap-[20px] lg:divide-x divide-[#2E631D]'>
          <div className='col-span-12 lg:col-span-6 xl:col-span-6'>
            {giftCardListingData?.map((data) => {
              if (data.name.toUpperCase() === 'E GIFT CARD') {
                return (
                  <div key={data.productId}>
                    <div className='w-full text-2xl-text py-[40px] font-sub text-center font-bold'>
                      E GIFT CARD
                    </div>
                    <div className='w-full p-[10px] lg:p-[40px] mb-[20px] lg:mb-[0px]'>
                      <CustomLink
                        href=''
                        className='flex flex-col justify-center items-center text-center'
                      >
                        <span
                          style={{ borderColor: '#2e631d !important' }}
                          className='mb-[30px] border-[2px] border-[#2e631d]  rounded-md w-full text-center max-w-lg mx-auto'
                        >
                          <Image
                            className='mx-auto w-full max-w-[480px]'
                            src={data.image}
                            alt='gift-box'
                          />
                        </span>
                        <span className='text-title-text font-semibold'>
                          Order E Gift Card Online
                        </span>
                      </CustomLink>
                    </div>
                    <div className='flex flex-wrap justify-center items-center mb-[15px] py-[20px]'>
                      <div className='max-w-sm mx-auto'>
                        <select
                          className='max-w-sm mx-auto border border-primary px-2 py-3 bg-[#ffffff] ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xs z-50'
                          name='eGiftCardValue'
                          id='eGiftCardValue'
                          {...register('eGiftCardValue')}
                          onChangeCapture={(e: any) =>
                            handleDropdownChange(
                              e.target.value,
                              'eGiftCardValue',
                            )
                          }
                          error={errors?.eGiftCardValue?.message}
                        >
                          <option value=''>Select Value Of Gift Card</option>
                          {giftCardListingData
                            ?.filter(
                              (data) =>
                                data.name.toUpperCase() === 'E GIFT CARD',
                            )
                            .map((data) => {
                              const giftCardPriceFrom = parseInt(
                                data.customFields.find(
                                  (field) =>
                                    field.label === 'Gift Card Price From',
                                ).value,
                              );
                              const giftCardPriceTo = parseInt(
                                data.customFields.find(
                                  (field) =>
                                    field.label === 'Gift Card Price To',
                                ).value,
                              );
                              const options = [];
                              for (
                                let i = giftCardPriceFrom;
                                i <= giftCardPriceTo;
                                i += 5
                              ) {
                                options.push(i);
                              }
                              return (
                                <>
                                  {options.map((option) => (
                                    <option key={option} value={option}>
                                      <PriceLabel price={option} className='' />
                                    </option>
                                  ))}
                                </>
                              );
                            })}
                        </select>
                      </div>
                      {errors?.eGiftCardValue?.message && (
                        <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                          {errors.eGiftCardValue.message}
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className='col-span-12 lg:col-span-6 xl:col-span-6'>
            <div className='w-full text-2xl-text py-[40px] font-sub text-center font-bold'>
              GIFT CARD BY MAIL
            </div>
            <div className='w-full p-[10px] lg:py-[20px] lg:px-[40px] mb-[20px] lg:mb-[0px]'>
              <div className='text-normal-text mb-[20px] font-semibold'>
                Please choose a style for your gift card:
              </div>
              <div className='grid grid-cols-1 xl:grid-cols-2 gap-[10px] gap-y-[20px]'>
                {giftCardListingData?.map((data) => {
                  if (data.name.toUpperCase() !== 'E GIFT CARD') {
                    return (
                      <div className='flex items-center' key={data.productId}>
                        <input
                          type='radio'
                          name='imageText'
                          {...register('imageText')}
                          value={data.name.split('Gift card by Mail')?.[0]}
                          id={data.name.split('Gift card by Mail')?.[0]}
                          onChangeCapture={(e: any) =>
                            handleDropdownChange(e.target.value, 'imageText')
                          }
                        />
                        <label
                          htmlFor={data.name}
                          className='cursor-pointer ml-[10px] text-normal-text flex justify-start items-center flex-col flex-col'
                        >
                          <span className='min-w-[168px]'>
                            <Image src={data.image} alt='' />
                          </span>
                          <span className='text-small-text w-full text-center py-[10px]'>
                            {data.name.split('Gift card by Mail')}
                          </span>
                        </label>
                      </div>
                    );
                  }
                })}
              </div>
              {errors?.imageText?.message && (
                <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                  {errors.imageText.message}
                </div>
              )}
              <div className='flex flex-wrap justify-center items-center mb-[15px] py-[20px]'>
                <div className='max-w-sm mx-auto'>
                  <select
                    className='max-w-sm mx-auto border border-primary px-2 py-3 bg-[#ffffff] ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xs z-50'
                    name='mailGiftCardValue'
                    {...register('mailGiftCardValue')}
                    onChangeCapture={(e: any) =>
                      handleDropdownChange(e.target.value, 'mailGiftCardValue')
                    }
                    error={errors?.mailGiftCardValue?.message}
                  >
                    <option value=''>Select Value Of Gift Card</option>
                    {giftCardListingData
                      ?.filter(
                        (data) =>
                          data.name.split('Gift card by Mail')[0] === imageText,
                      )
                      ?.map((data) => {
                        const giftCardPriceFrom = parseInt(
                          data.customFields.find(
                            (field) => field.label === 'Gift Card Price From',
                          ).value,
                        );
                        const giftCardPriceTo = parseInt(
                          data.customFields.find(
                            (field) => field.label === 'Gift Card Price To',
                          ).value,
                        );
                        const options = [];
                        for (
                          let i = giftCardPriceFrom;
                          i <= giftCardPriceTo;
                          i += 5
                        ) {
                          options.push(i);
                        }
                        return (
                          <>
                            {options.map((option) => (
                              <option key={option} value={option}>
                                <PriceLabel price={option} className='' />
                              </option>
                            ))}
                          </>
                        );
                      })}
                  </select>
                </div>
                {errors?.mailGiftCardValue?.message && (
                  <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                    {errors.mailGiftCardValue.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='pt-[40px] lg:pt-[70px]  mx-auto'>
          <div className='text-2xl-text font-bold font-sub mb-[30px] text-center'>
            {eGiftCardValue
              ? 'E GIFT CARD'
              : mailGiftCardValue && imageText
              ? `GIFT CARD BY MAIL - ${imageText}`
              : ''}
          </div>
          {(eGiftCardValue || (mailGiftCardValue && imageText)) && (
            <>
              <div className='w-full mb-[20px] block text-small-text font-bold uppercase max-w-4xl mx-auto'>
                Recipient's Information
              </div>
              <div className='max-w-4xl mx-auto mb-[30px]'>
                <div className='flex flex-wrap mx-[-15px] '>
                  <span className='mb-1 text-rose-500 absolute top-full left-0'>
                    {errorMessage}
                  </span>
                  <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                    <Input
                      type='text'
                      label='Recipient First Name'
                      name='firstName'
                      placeholder="Enter recipient's firstname"
                      register={register}
                      error={errors?.firstName?.message}
                    />
                  </div>
                  <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                    <Input
                      type='text'
                      label='Recipient Last Name'
                      name='lastName'
                      placeholder="Enter recipient's lastname"
                      register={register}
                      error={errors?.lastName?.message}
                    />
                  </div>
                  <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                    <Input
                      type='email'
                      label='EMAIL'
                      name='email'
                      placeholder="Enter recipient's email"
                      register={register}
                      error={errors?.email?.message}
                    />
                  </div>
                  <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                    <Input
                      type='email'
                      label='Confirm Email'
                      name='confirmEmail'
                      placeholder='Confirm Email'
                      isRequired
                      register={register}
                      error={errors?.confirmEmail?.message}
                    />
                  </div>
                  {mailGiftCardValue && (
                    <>
                      <div className='w-full px-[15px] mb-[20px]'>
                        <Input
                          type='text'
                          label='Address Line 1'
                          name='address1'
                          placeholder="Enter recipient's Address line 1"
                          register={register}
                          error={errors?.address1?.message}
                          max={35}
                        />
                      </div>
                      <div className='w-full px-[15px] mb-[20px]'>
                        <Input
                          type='text'
                          label='Address Line 2'
                          name='address2'
                          placeholder="Enter recipient's Address line 2"
                          isRequired
                          register={register}
                          max={35}
                          error={errors?.address2?.message}
                        />
                      </div>
                      <div className='w-full px-[15px] mb-[20px]'>
                        <Input
                          type='text'
                          label='City'
                          name='city'
                          register={register}
                          placeholder="Enter recipient's city"
                          error={errors?.city?.message}
                        />
                      </div>
                      <div className='md:w-8/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='state'
                          className='block text-small-text mb-[5px] font-bold uppercase'
                        >
                          STATE
                        </label>
                        <select
                          className='max-w-sm mx-auto border border-primary px-2 py-3 bg-[#ffffff] ring-1 ring-black ring-opacity-5 focus:outline-none rounded-xs z-50'
                          name='state'
                          id='state'
                          {...register('state')}
                          error={errors?.state?.message}
                        >
                          <option value=''> Select State</option>
                          {getStateList?.map((data) => (
                            <option value={data.name} key={data.id}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                        {errors?.state?.message && (
                          <div className='h-6 top-full left-0 text-red-500 text-[16px] font-medium'>
                            {errors.state.message}
                          </div>
                        )}
                      </div>
                      <div className='md:w-4/12 w-full px-[15px] mb-[20px]'>
                        <Input
                          type='text'
                          label='ZIP CODE'
                          name='zipCode'
                          placeholder='Zipcode'
                          register={register}
                          error={errors?.zipCode?.message}
                        />
                      </div>
                    </>
                  )}
                  <div className='w-full px-[15px] mb-[20px]'>
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
                      Message to Gift Card recipient ({message.length}
                      /100 character limit)
                    </label>
                    <textarea
                      id='giftMessage'
                      name='message'
                      cols={30}
                      rows={5}
                      placeholder='Type your message here...'
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
                      price={eGiftCardValue || mailGiftCardValue}
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
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default AddGiftCertificate;
