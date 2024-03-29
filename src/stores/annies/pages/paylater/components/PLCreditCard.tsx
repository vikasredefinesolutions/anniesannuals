import { _CreditCardFields } from '@/features/checkout/checkoutController/config';
import {
  _CustomEvent,
  _options,
} from '@/features/checkout/checkoutController/paymentController';
import Image from '@/shared/Components/Image';
import { cardType } from '@/shared/constant/common.constant';
import { getPaymentOptions } from '@/utils/cookie.helper';
import {
  Control,
  ControllerProps,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import {
  CheckoutSelectInput,
  CheckoutTextInput,
} from '../../checkout/components/checkoutInputs';
import { isNumberKey } from '@/shared/utils/helper';

interface _Props {
  setCreditCardFieldValue: UseFormSetValue<_CreditCardFields>;
  monthOptions: _options[];
  yearOptions: _options[];
  maxLengthCalculator: (name: 'ccNumber' | 'cvc', value: string) => number;
  detectCardIssuer: (cardNumber: string) => string;
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerProps<TFieldValues, TName>,
  ) => import('react').ReactElement<
    any,
    string | import('react').JSXElementConstructor<any>
  >;
  creditCardControl: Control<_CreditCardFields>;
  creditCardTouchedFields: Partial<
    Readonly<{
      ccNumber?: boolean | undefined;
      cvc?: boolean | undefined;
      name?: boolean | undefined;
      expiryMonth?: boolean | undefined;
      expiryYear?: boolean | undefined;
    }>
  >;
  errors: FieldErrors<_CreditCardFields>;
  credirCardFieldValues: UseFormGetValues<_CreditCardFields>;
  customYearChangeHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  customMonthChangehandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
  selectedPaymentMethod: string;
}
const PayLaterPaymentComponent = ({
  monthOptions,
  yearOptions,
  maxLengthCalculator,
  detectCardIssuer,
  Controller,
  creditCardControl,
  creditCardTouchedFields,
  errors,
  setCreditCardFieldValue,
  credirCardFieldValues,
  customMonthChangehandler,
  customYearChangeHandler,
  setSelectedPaymentMethod,
  selectedPaymentMethod,
}: _Props) => {
  const cardTypeImage = () => {
    return cardType.map((res) => {
      if (detectCardIssuer(credirCardFieldValues().ccNumber) !== res.name)
        return null;

      return (
        <div
          key={res.name}
          className={`opacity-1 block ml-[4px] w-[48px] mr-[4px]`}
        >
          <img className='' src={res.url} alt='' />
        </div>
      );
    });
  };

  return (
    <>
      <div className='col-span-12 lg:col-span-4'>
        <div className=' w-full pr-[20px]'>
          <div className='font-bold text-normal-text mb-[10px]'>
            Payment Information
          </div>
          <div className='flex '>
            {getPaymentOptions().map((item, index) => {
              return (
                <div key={index} className='p-[10px]'>
                  <input
                    id={item.paymentOptionName}
                    name='paymentMethod'
                    checked={selectedPaymentMethod === item.paymentOptionName}
                    type='radio'
                    value={item.paymentOptionName}
                    className='h-4 w-4 border-gray-300 rounded cursor-pointer'
                    onChange={(e) => {
                      setSelectedPaymentMethod(e.target.value);
                    }}
                  />
                  <label
                    htmlFor={item.paymentOptionName}
                    className='ml-[10px] text-normal-text font-sub font-bold'
                  >
                    Pay With {item.paymentOptionName}
                  </label>
                </div>
              );
            })}
          </div>
          {selectedPaymentMethod !== 'Paypal' && (
            <div>
              <div className='text-small-text mb-[15px]'>
                We accepts all major credit and debit cards.
              </div>
              <div className='flex flex-wrap mx-[-10px]'>
                <div className='mb-[20px] px-[10px]'>{cardTypeImage()}</div>
                {detectCardIssuer(credirCardFieldValues().ccNumber) === '' && (
                  <>
                    <div className='mb-[20px] px-[10px]'>
                      <Image
                        alt=''
                        isStatic
                        src='/assets/images/card-visa.png'
                      />
                    </div>
                    <div className='mb-[20px] px-[10px]'>
                      <Image
                        isStatic
                        alt=''
                        src='/assets/images/card-master-card.png'
                      />
                    </div>
                    <div className='mb-[20px] px-[10px]'>
                      <Image
                        alt=''
                        isStatic
                        src='/assets/images/card-american-express.png'
                      />
                    </div>
                    <div className='mb-[20px] px-[10px]'>
                      <Image
                        alt=''
                        isStatic
                        src='/assets/images/card-discover.png'
                      />
                    </div>
                  </>
                )}
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor='name'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold'
                >
                  Name on the Card
                </label>
                <Controller
                  name='name'
                  control={creditCardControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      label='Name On the Card'
                      placeHolder='Enter the Name on The Card*'
                      additionalClass={''}
                      type={'text'}
                      autoComplete='first-name'
                      name={'name'}
                      required={true}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      touched={!!creditCardTouchedFields.name}
                      error={!!errors?.name}
                    />
                  )}
                />
              </div>
              <div className='w-full mb-[25px]'>
                <label
                  htmlFor='ccNumber'
                  className='block text-small-text mb-[5px] ml-[15px] font-bold'
                >
                  Credit Card Number
                </label>
                <Controller
                  name='ccNumber'
                  control={creditCardControl}
                  render={({ field: { value, onChange, onBlur } }) => (
                    <CheckoutTextInput
                      label='Credit Card Number'
                      additionalClass={''}
                      placeHolder='Credit Card Number*'
                      type={'text'}
                      name={'ccNumber'}
                      autoComplete='cc-number'
                      required={true}
                      value={value}
                      length={maxLengthCalculator(
                        'ccNumber',
                        credirCardFieldValues().ccNumber,
                      )}
                      onChange={(e) => {
                        if (
                          (e.nativeEvent as _CustomEvent).inputType ===
                            'deleteContentBackward' &&
                          e.currentTarget.value === ''
                        ) {
                          setCreditCardFieldValue('expiryMonth', '');
                          setCreditCardFieldValue('expiryYear', '');
                          setCreditCardFieldValue('cvc', '');
                        }
                        if (Number(e.target.value) || e.target.value === '') {
                          onChange(e);
                        }

                        // setCreditCardFieldValue(
                        //   'ccNumber',
                        //   e.target.value,
                        // );
                      }}
                      touched={!!creditCardTouchedFields.ccNumber}
                      creditCard={true}
                      onBlur={onBlur}
                      error={!!errors?.ccNumber}
                    />
                  )}
                />
              </div>
              <div className='flex flex-wrap'>
                <div className='w-full mb-[25px]'>
                  <label
                    htmlFor='expiryMonth'
                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                  >
                    Month
                  </label>
                  <Controller
                    name='expiryMonth'
                    control={creditCardControl}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CheckoutSelectInput
                        label='MONTH'
                        additionalClass={''}
                        autoComplete='cc-exp-month'
                        name={'expiryMonth'}
                        initialOption={'Month*'}
                        required={true}
                        value={value}
                        onChange={customMonthChangehandler}
                        disabled={false}
                        onBlur={onBlur}
                        valid={value !== '' && !!errors?.expiryMonth}
                        inValid={value === '' && !!errors?.expiryMonth}
                        options={monthOptions}
                      />
                    )}
                  />
                </div>
                <div className='w-full mb-[25px]'>
                  <label
                    htmlFor='expiryYear'
                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                  >
                    Year
                  </label>
                  <Controller
                    name='expiryYear'
                    control={creditCardControl}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CheckoutSelectInput
                        label='YEAR'
                        additionalClass={''}
                        autoComplete='cc-exp-year'
                        name={'expiryYear'}
                        initialOption={'Year*'}
                        required={true}
                        value={value}
                        onChange={customYearChangeHandler}
                        disabled={false}
                        onBlur={onBlur}
                        valid={value !== '' && !!errors?.expiryYear}
                        inValid={value === '' && !!errors?.expiryYear}
                        options={yearOptions}
                      />
                    )}
                  />
                </div>
                <div className='w-full mb-[25px]'>
                  <label
                    htmlFor='cvc'
                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                  >
                    Cvv
                    <span className='bg-primary text-[#ffffff] rounded-full inline-block text-center text-[14px] w-[18px] leading-[18px] h-[18px]'>
                      i
                    </span>
                  </label>

                  <Controller
                    name='cvc'
                    control={creditCardControl}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <CheckoutTextInput
                        label='Security Code(CVV/CVC)'
                        placeHolder='Security Code*'
                        additionalClass={''}
                        type={'text'}
                        autoComplete='cc-csc'
                        name={'cvc'}
                        required={true}
                        value={value}
                        length={maxLengthCalculator(
                          'cvc',
                          credirCardFieldValues().ccNumber,
                        )}
                        onBlur={onBlur}
                        onChange={(event) => {
                          if (isNumberKey(event)) {
                            onChange(event);
                          }
                        }}
                        touched={!!creditCardTouchedFields.cvc}
                        error={!!errors?.cvc}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PayLaterPaymentComponent;
