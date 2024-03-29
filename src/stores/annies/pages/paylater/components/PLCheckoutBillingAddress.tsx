import { useAppDispatch } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import {
  CheckoutAddressFieldsType,
  _CreditCardFields,
} from '@/features/checkout/checkoutController/config';
import { _Country } from '@/shared/apis/checkout/fetchCountriesList';
import { _State } from '@/shared/apis/checkout/fetchStateList';
import React from 'react';
import {
  Control,
  ControllerProps,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormGetValues,
  UseFormHandleSubmit,
} from 'react-hook-form';
import {
  CheckoutSelectInput,
  CheckoutTextInput,
} from '../../checkout/components/checkoutInputs';
export interface AddressTouchedFields {
  firstname?: boolean | undefined;
  lastName?: boolean | undefined;
  address1?: boolean | undefined;
  address2?: boolean | undefined;
  city?: boolean | undefined;
  state?: boolean | undefined;
  postalCode?: boolean | undefined;
  countryCode?: boolean | undefined;
  countryName?: boolean | undefined;
  email?: boolean | undefined;
  phone?: boolean | undefined;
}

interface PayLaterBillingAddress {
  states: _State[];
  countries: _Country[];

  postalCodeHandler: (
    e: React.FocusEvent<HTMLInputElement>,
    addressType: string,
  ) => void;
  countryHandler: (
    e: React.ChangeEvent<HTMLSelectElement>,
    addressType: string,
    previousCountry: string,
  ) => void;
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerProps<TFieldValues, TName>,
  ) => import('react').ReactElement<
    any,
    string | import('react').JSXElementConstructor<any>
  >;
  billingValues: UseFormGetValues<CheckoutAddressFieldsType>;
  billingControl: Control<CheckoutAddressFieldsType>;
  billingErrors: FieldErrors<CheckoutAddressFieldsType>;
  billingTouchedFields: Partial<Readonly<AddressTouchedFields>>;
  billingSubmitHandle: UseFormHandleSubmit<
    CheckoutAddressFieldsType,
    undefined
  >;
  handleReviewOrder: () => void;
  creditCardhandleSubmit: UseFormHandleSubmit<_CreditCardFields>;
}

function PLCheckoutBillingAddress({
  countries,
  states,
  Controller,
  postalCodeHandler,
  countryHandler,
  billingValues,
  billingControl,
  billingErrors,
  billingTouchedFields,
  handleReviewOrder,
  billingSubmitHandle,
  creditCardhandleSubmit,
}: PayLaterBillingAddress) {
  const dispatch = useAppDispatch();
  return (
    <>
      <form
        onSubmit={(e) => {
          billingSubmitHandle(
            () =>
              creditCardhandleSubmit(handleReviewOrder, () =>
                dispatch(
                  openAlertModal({
                    isAlertModalOpen: true,
                    title: 'Error',
                    description: 'Something Went Wrong in Credit Card Form',
                  }),
                ),
              )(e),
            () =>
              dispatch(
                openAlertModal({
                  isAlertModalOpen: true,
                  title: 'Error',
                  description: 'Something Went Wrong in Billing Form',
                }),
              ),
          )(e);
        }}
      >
        <div className='col-span-12 lg:col-span-4'>
          <div className='w-full max-w-xl'>
            <div className='font-bold text-normal-text mb-[10px]'>
              Billing Address:
            </div>
            <div className='flex flex-wrap'>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='firstname'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Fisrt Name
                  <span className='text-rose-500'>*</span>
                </label>

                <Controller
                  name='firstname'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder='First Name'
                      label='FIRST NAME'
                      additionalClass={''}
                      type={'text'}
                      name={'firstname'}
                      required={true}
                      value={value}
                      onChange={onChange}
                      autoComplete='given-name'
                      onBlur={onBlur}
                      touched={!!billingTouchedFields.firstname}
                      error={!!billingErrors.firstname}
                    />
                  )}
                />
              </div>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='lastName'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Last Name <span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='lastName'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder='Last Name'
                      label='LAST NAME'
                      additionalClass={''}
                      type={'text'}
                      name={'lastName'}
                      autoComplete='family-name'
                      required={true}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      touched={!!billingTouchedFields.lastName}
                      error={!!billingErrors.lastName}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='address1'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Address Line 1<span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='address1'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder='Address Line1'
                      label='STREET ADDRESS'
                      additionalClass={''}
                      type={'text'}
                      name={'address1'}
                      length={35}
                      required={true}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      autoComplete='address-line3'
                      touched={!!billingTouchedFields.address1}
                      error={!!billingErrors.address1}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='address2'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Address Line 2 (optional)
                </label>
                <Controller
                  name='address2'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder=''
                      label='Address 2'
                      additionalClass={''}
                      type={'text'}
                      name={'address2'}
                      autoComplete='address-level2'
                      required={false}
                      length={35}
                      value={value || ''}
                      onChange={onChange}
                      onBlur={onBlur}
                      touched={!!billingTouchedFields.address2}
                      error={!!billingErrors.address2}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='city'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  City <span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='city'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder='City'
                      label='Enter Your City'
                      additionalClass={''}
                      type={'text'}
                      name={'city'}
                      required={true}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      autoComplete='address-line3'
                      touched={!!billingTouchedFields.city}
                      error={!!billingErrors.city}
                    />
                  )}
                />
              </div>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='state'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  State <span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='state'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutSelectInput
                      label='STATE / PROVINCE'
                      additionalClass={''}
                      name={'state'}
                      required={true}
                      initialOption={'State / Province*'}
                      autoComplete='address-level1'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      disabled={false}
                      valid={
                        !!billingTouchedFields.state &&
                        value !== '' &&
                        !!billingErrors.state
                      }
                      inValid={!!billingErrors.state}
                      options={states}
                    />
                  )}
                />
              </div>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='postalCode'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Zip
                  <span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='postalCode'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder='Zip Code'
                      label='ZIP CODE'
                      additionalClass={''}
                      type={'text'}
                      name={'postalCode'}
                      required={true}
                      value={value}
                      autoComplete='postal-code'
                      onChange={onChange}
                      onBlur={(e) => {
                        postalCodeHandler(e, 'BILL');
                      }}
                      touched={!!billingTouchedFields.postalCode}
                      error={!!billingErrors.postalCode}
                    />
                  )}
                />
              </div>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='countryName'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Country
                  <span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='countryName'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutSelectInput
                      label='COUNTRY'
                      additionalClass={''}
                      autoComplete='country-name'
                      name={'countryName'}
                      initialOption={'Select Country*'}
                      required={true}
                      value={value}
                      onChange={(e) => {
                        countryHandler(e, 'BILL', value);
                      }}
                      onBlur={onBlur}
                      disabled={false}
                      valid={
                        !!billingTouchedFields.countryCode &&
                        value !== '' &&
                        !!billingErrors?.countryCode
                      }
                      inValid={!!billingErrors.countryCode}
                      options={countries}
                    />
                  )}
                />
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='email'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Email <span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='email'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder='Email'
                      label='EMAIL'
                      additionalClass={''}
                      type={'text'}
                      name={'email'}
                      required={true}
                      value={value}
                      autoComplete='email'
                      onChange={onChange}
                      onBlur={onBlur}
                      touched={!!billingTouchedFields.email}
                      error={!!billingErrors?.email}
                    />
                  )}
                />
              </div>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='phone'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                >
                  Phone <span className='text-rose-500'>*</span>
                </label>
                <Controller
                  name='phone'
                  control={billingControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      placeHolder='Phone Number'
                      label='PHONE NUMBER'
                      additionalClass={''}
                      type={'text'}
                      name={'phone'}
                      required={true}
                      autoComplete='tel'
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      touched={!!billingTouchedFields.phone}
                      error={!!billingErrors?.phone}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className='w-full max-w-xl'>
            <div className='flex flex-wrap justify-start items-center mb-[19px]'>
              <div className='mb-[20px] sm:mb-0'>
                <button
                  type='submit'
                  className='inline-block btn btn-primary px-[37px] py-[15px]'
                >
                  Review Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default PLCheckoutBillingAddress;
