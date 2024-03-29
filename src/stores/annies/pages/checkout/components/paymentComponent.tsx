import { useAppSelector } from '@/app/redux/hooks';
import { checkoutActions } from '@/app/redux/slices/checkoutSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import CheckoutPaymentController, {
  _CustomEvent,
} from '@/features/checkout/checkoutController/paymentController';
import Image from '@/shared/Components/Image';
import { cardType } from '@/shared/constant/common.constant';
import { getPaymentOptions } from '@/shared/utils/cookie.helper';
import { isNumberKey } from '@/shared/utils/helper';
import { useDispatch } from 'react-redux';
import ApplyGiftCard from './applyGiftCard';
import { CheckoutSelectInput, CheckoutTextInput } from './checkoutInputs';

const PaymentComponent = () => {
  const { checkoutShippingSaved, sendAsGift, giftMessage } = useAppSelector(
    (state) => state.checkout.shippingMethod,
  );

  const dispatch = useDispatch();
  const { shippingList } = useAppSelector((state) => state.cart);

  const { loggedIn: isEmployeeLoggedIn } = useAppSelector(
    (state) => state.employee,
  );

  const { orderTotal, tax } = useAppSelector((state) => state.cart);

  const { checkoutAddressSaved, shipping } = useAppSelector(
    (state) => state.checkout.address,
  );

  const { update_CheckoutShippingMethod, update_PaymentDetails } =
    checkoutActions;

  const {
    checkoutPaymentSaved,
    giftCardAmount,
    creditCard,
    giftCardNumber,
    skipPaymentMethod,
    method,
    storeCredits,
    useStoreCredit,
    usedStoreCredits,
  } = useAppSelector((state) => state.checkout.payment);

  return (
    <>
      <CheckoutPaymentController
        cases={{
          ready: ({
            changeShippingMethod,
            maxLengthCalculator,
            detectCardIssuer,
            monthOptions,
            yearOptions,
            customYearChangeHandler,
            customMonthChangehandler,
            handleShippingContinue,
            handlePaymentContinue,
            setCreditCardFieldValue,
            creditCardhandleSubmit,
            creditCardControl,
            Controller,
            credirCardFieldValues,
            creditCardTouchedFields,
            creditCardFormValid,
            handleGiftCheckBoxClick,
            handleSendAsGift,
            errors,
            editPaymenthandler,
            giftCardValue,
            balance,
            giftCouponNameChangeHandler,
            handleSkipPaymentMethod,
            applyGiftCardDiscount,
            setAddCredit,
            addCredit,
            setGiftCardValue,
            storeCreditBalanceHandler,
            giftWalletBalanceHandler,
          }) => {
            const cardTypeImage = () => {
              return cardType.map((res) => {
                if (
                  detectCardIssuer(credirCardFieldValues().ccNumber) !==
                  res.name
                )
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

            const returnPaymentMethod = () => {
              if (isEmployeeLoggedIn && skipPaymentMethod) {
                return (
                  <>
                    <div className='lg:pl-[25px] pl-0'>
                      <div className='flex flex-wrap items-center'>
                        <div className='text-normal-text font-sub font-bold'>
                          Pay Later
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
              if (giftCardNumber && usedStoreCredits) {
                return (
                  <>
                    <div className='lg:pl-[25px] pl-0'>
                      <div className='flex flex-wrap items-center'>
                        <div className='text-normal-text font-sub font-bold'>
                          Gift Card Applied : {giftCardNumber}
                        </div>
                      </div>
                    </div>
                    <div className='lg:pl-[25px] pl-0'>
                      <div className='flex flex-wrap items-center'>
                        <div className='text-normal-text font-sub font-bold'>
                          {`Store Credit Applied - $${usedStoreCredits?.toFixed(
                            2,
                          )}`}
                        </div>
                      </div>
                    </div>
                  </>
                );
              }

              if (giftCardAmount === orderTotal + tax) {
                return (
                  <>
                    <div className='lg:pl-[25px] pl-0'>
                      <div className='flex flex-wrap items-center'>
                        <div className='text-normal-text font-sub font-bold'>
                          Gift Card Applied : {giftCardNumber}
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
              if (
                usedStoreCredits.toFixed(2) ===
                (orderTotal - giftCardAmount + tax).toFixed(2)
              ) {
                return (
                  <>
                    <div className='lg:pl-[25px] pl-0'>
                      <div className='flex flex-wrap items-center'>
                        <div className='text-normal-text font-sub font-bold'>
                          {`Store Credit Applied - $${usedStoreCredits?.toFixed(
                            2,
                          )}`}
                        </div>
                      </div>
                    </div>
                  </>
                );
              }

              if (method === 'Credit Card') {
                return (
                  <>
                    <div className='lg:pl-[25px] pl-0'>
                      <div className='flex flex-wrap items-center'>
                        <div className='mr-[10px]'>{cardTypeImage()}</div>
                        <div>
                          <div className='text-normal-text font-sub font-bold'>
                            Card Ending in{' '}
                            {creditCard.cardName === 'AMEX'
                              ? 'XXXX-XXXX-XXX-'
                              : 'XXXX-XXXX-XXXX-'}
                            {creditCard.ccNumber.slice(
                              creditCard.ccNumber.length - 4,
                              creditCard.ccNumber.length,
                            )}
                          </div>
                          <div className='text-default-text'>
                            Exp: {creditCard.month} / {creditCard.year}
                          </div>
                        </div>
                      </div>
                    </div>
                    {giftCardNumber && (
                      <div className='lg:pl-[25px] pl-0'>
                        <div className='flex flex-wrap items-center'>
                          <div className='text-normal-text font-sub font-bold'>
                            Gift Card Applied : {giftCardNumber}
                          </div>
                        </div>
                      </div>
                    )}

                    {usedStoreCredits > 0 && (
                      <div className='lg:pl-[25px] pl-0'>
                        <div className='flex flex-wrap items-center'>
                          <div className='text-normal-text font-sub font-bold'>
                            {`Store Credit Applied - $${usedStoreCredits?.toFixed(
                              2,
                            )}`}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              }
              if (method === 'Paypal') {
                return (
                  <>
                    <div className='lg:pl-[25px] pl-0'>
                      <div className='flex flex-wrap items-center'>
                        <div className='text-normal-text font-sub font-bold'>
                          PAYPAL
                        </div>
                      </div>
                    </div>
                    {giftCardNumber && (
                      <div className='lg:pl-[25px] pl-0'>
                        <div className='flex flex-wrap items-center'>
                          <div className='text-normal-text font-sub font-bold'>
                            Gift Card Applied : {giftCardNumber}
                          </div>
                        </div>
                      </div>
                    )}

                    {usedStoreCredits > 0 && (
                      <div className='lg:pl-[25px] pl-0'>
                        <div className='flex flex-wrap items-center'>
                          <div className='text-normal-text font-sub font-bold'>
                            {`Store Credit Applied - $${usedStoreCredits?.toFixed(
                              2,
                            )}`}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              }
            };
            return (
              <>
                {' '}
                <div className='pb-[15px] mb-[15px] border-b border-b-[#D4CEB9]'>
                  {checkoutShippingSaved ? (
                    <div className=''>
                      <div className='flex justify-between items-center'>
                        <div className='font-sub font-bold text-sub-text mb-[30px]'>
                          <span className='material-icons text-[#388C1D] mr-[5px] align-middle'>
                            check_circle
                          </span>
                          Shipping Method
                        </div>
                        <div className='mb-[30px]'>
                          <button
                            onClick={() => handleShippingContinue(false)}
                            className='text-[#3B5697] flex items-center'
                          >
                            <span className='material-icons-outlined mr-[5px] align-middle'>
                              edit
                            </span>
                            <span className='font-sub'>Edit</span>
                          </button>
                        </div>
                      </div>
                      <div className='lg:pl-[25px] pl-0'>
                        <div className='flex flex-wrap items-center mb-[5px]'>
                          {shippingList.map((item, index) => {
                            return (
                              <p
                                key={`shiping_${index}_${item.name}`}
                                className='font-sub font-bold text-normal-text mr-[15px]'
                              >
                                {item.name == 'Shipment'
                                  ? 'Current order shipping'
                                  : item.name == 'Spring Shipment'
                                  ? 'Pre-order shipping'
                                  : item.name}{' '}
                                ${item.price}
                              </p>
                            );
                          })}
                          <span className='font-body text-small-text font-semibold'>
                            <span className='text-[#9F2D3C]'>
                              Shipping to {shipping?.state}
                            </span>
                          </span>
                        </div>
                        {sendAsGift && (
                          <div className='text-default-text font-bold mb-[5px]'>
                            Gift Box - {sendAsGift ? 'Yes' : 'No'}
                          </div>
                        )}
                        {giftMessage && (
                          <div className='text-default-text font-bold mb-[5px]'>
                            Gift Message - {giftMessage}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className=''>
                      <div className='font-sub font-bold text-sub-text'>
                        2. Shipping Method
                      </div>
                      {checkoutAddressSaved && (
                        <div className='lg:pl-[25px] pl-0 mt-[30px]'>
                          <div className='text-normal-text pb-[15px]'>
                            <div className=''>
                              {shippingList.map((item, index) => {
                                return (
                                  <p key={index} className='pb-[10px]'>
                                    <label htmlFor='shipping'>
                                      <span className='font-bold'>
                                        {item.name} ${item.price}
                                      </span>
                                    </label>
                                  </p>
                                );
                              })}
                            </div>

                            <span className='font-body text-small-text font-semibold'>
                              <span className='text-[#9F2D3C]'>
                                Shipping to {shipping?.state}
                              </span>
                            </span>
                          </div>
                          <div
                            className='flex flex-wrap mx-[-15px] w-full'
                            x-data='{checkbox1 : false}'
                          >
                            <div className='md:w-5/12 w-full px-[15px]'>
                              <div className='flex items-center mb-[10px]'>
                                <input
                                  id='SendAsAGift-0'
                                  name='SendAsAGift[]'
                                  onChange={(e) => handleSendAsGift(e)}
                                  checked={sendAsGift}
                                  x-model='checkbox1'
                                  type='checkbox'
                                  className='h-4 w-4 border-gray-300 rounded'
                                />
                                <label
                                  htmlFor='SendAsAGift-0'
                                  className='ml-[10px] text-small-text font-semibold'
                                >
                                  Send as a gift
                                  <span className='material-icons-outlined align-middle ml-[5px]'>
                                    redeem
                                  </span>
                                  <span className='text-small-text'>
                                    We'll hide the price.
                                  </span>
                                </label>
                              </div>
                              {/* <div className='mb-[20px] md:mb-0 '>
                              </div> */}
                            </div>

                            <div className='md:w-5/12 w-full px-[15px]'>
                              <div
                                className='w-full mb-[20px] md:mb-0'
                                x-show='checkbox1'
                                style={{
                                  display: `${!sendAsGift ? 'none' : 'block'}`,
                                }}
                              >
                                <label
                                  htmlFor='AddressLine1'
                                  className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                >
                                  GIFT MESSAGE
                                </label>
                                <textarea
                                  id='GiftMessage'
                                  name='GiftMessage'
                                  placeholder='Enter your message here..'
                                  value={giftMessage}
                                  maxLength={100}
                                  onChange={(e) =>
                                    dispatch(
                                      update_CheckoutShippingMethod({
                                        type: 'SAVE_GIFT_MESSAGE',
                                        value: e.target.value,
                                      }),
                                    )
                                  }
                                  className='form-input'
                                ></textarea>
                              </div>
                            </div>

                            <div className='md:w-2/12 w-full px-[15px] flex justify-end items-end'>
                              <button
                                onClick={() => handleShippingContinue(true)}
                                className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className='pb-[15px] mb-[15px] border-b border-b-[#D4CEB9]'>
                  {checkoutPaymentSaved ? (
                    <div className=''>
                      <div className='flex justify-between items-center'>
                        <div className='font-sub font-bold text-sub-text mb-[30px]'>
                          <span className='material-icons text-[#388C1D] mr-[5px] align-middle'>
                            check_circle
                          </span>
                          Payment Information
                        </div>
                        <div className='mb-[30px]'>
                          <button
                            onClick={() => editPaymenthandler()}
                            className='text-[#3B5697] flex items-center'
                          >
                            <span className='material-icons-outlined mr-[5px] align-middle'>
                              edit
                            </span>
                            <span className='font-sub'>Edit</span>
                          </button>
                        </div>
                      </div>

                      {returnPaymentMethod()}
                    </div>
                  ) : (
                    <div className=''>
                      <div className='font-sub font-bold text-sub-text'>
                        3. Payment Information
                      </div>
                      {checkoutShippingSaved && (
                        <div className='lg:pl-[25px] pl-0 mt-[30px]'>
                          <div className='bg-[#FCFFF5] border border-gray-border rounded-sm p-[30px] mb-[10px] last:mb-0'>
                            {storeCredits > 0 && (
                              <label className='text-normal-text font-sub font-bold ml-[10px]'>
                                <input
                                  type='checkbox'
                                  className='mr-2'
                                  checked={useStoreCredit}
                                  onChange={(e) =>
                                    storeCreditBalanceHandler(e.target.checked)
                                  }
                                />
                                Use Store Credit (${storeCredits.toFixed(2)})
                              </label>
                            )}
                            {/* {giftCardWalletBalance > 0 && (
                              <label className='text-normal-text font-sub font-bold ml-[10px]'>
                                <input
                                  type='checkbox'
                                  checked={useGiftWalletBalance}
                                  onChange={(e) =>
                                    giftWalletBalanceHandler(
                                      !useGiftWalletBalance,
                                    )
                                  }
                                />
                                Use Gift Card Wallet Balance($    
                                {giftCardWalletBalance})
                              </label>
                            )} */}
                            {orderTotal +
                              tax -
                              usedStoreCredits -
                              giftCardAmount >
                              0 && (
                              <div className='flex justify-between'>
                                <div className='flex '>
                                  {getPaymentOptions().map((item, index) => {
                                    return (
                                      <div key={index} className='p-[10px]'>
                                        <input
                                          id={item.paymentOptionName}
                                          name='paymentMethod'
                                          checked={
                                            method === item.paymentOptionName
                                          }
                                          type='radio'
                                          value={item.paymentOptionName}
                                          className='h-4 w-4 border-gray-300 rounded'
                                          onChange={(e) => {
                                            dispatch(
                                              update_PaymentDetails({
                                                method: 'CHANGED',
                                                type: item.paymentOptionName,
                                              }),
                                            );
                                            setGiftCardValue('');
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
                                <Image
                                  isStatic
                                  alt='secure payment'
                                  src='/assets/icons/secure.svg'
                                />
                              </div>
                            )}
                            {orderTotal +
                              tax -
                              usedStoreCredits -
                              giftCardAmount >
                              0 &&
                              method === 'Credit Card' && (
                                <form
                                  onSubmit={(e) => {
                                    if (
                                      giftCardAmount.toFixed(2) ==
                                      (orderTotal + tax).toFixed(2)
                                    ) {
                                      dispatch(
                                        update_PaymentDetails({
                                          method: 'CHECKOUT_PAYMENT_SAVED',
                                          value: true,
                                        }),
                                      );
                                    } else {
                                      creditCardhandleSubmit(
                                        handlePaymentContinue,
                                        () =>
                                          dispatch(
                                            openAlertModal({
                                              title: 'Error',
                                              description:
                                                'Something Went Wrong in Credit Card Form',
                                              isAlertModalOpen: true,
                                            }),
                                          ),
                                      )(e);
                                    }
                                  }}
                                >
                                  <div className='pt-[30px]'>
                                    <div className='text-small-text mb-[15px]'>
                                      Annie's annual's accepts all major credit
                                      and debit cards.
                                    </div>
                                    <div className='flex flex-wrap mx-[-10px]'>
                                      <div className='mb-[20px] px-[10px]'>
                                        {cardTypeImage()}
                                      </div>
                                      {detectCardIssuer(
                                        credirCardFieldValues().ccNumber,
                                      ) === '' && (
                                        <>
                                          <div className='mb-[20px] px-[10px]'>
                                            <img src='/assets/images/card-visa.png' />
                                          </div>
                                          <div className='mb-[20px] px-[10px]'>
                                            <img src='/assets/images/card-master-card.png' />
                                          </div>
                                          <div className='mb-[20px] px-[10px]'>
                                            <img src='/assets/images/card-american-express.png' />
                                          </div>
                                          <div className='mb-[20px] px-[10px]'>
                                            <img src='/assets/images/card-discover.png' />
                                          </div>
                                        </>
                                      )}
                                    </div>
                                    <div className='w-full mb-[20px]'>
                                      <label
                                        htmlFor='name'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        NAME ON THE CARD
                                      </label>
                                      <Controller
                                        name='name'
                                        control={creditCardControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
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
                                            touched={
                                              !!creditCardTouchedFields.name
                                            }
                                            error={!!errors?.name}
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className='w-full mb-[20px]'>
                                      <label
                                        htmlFor='ccNumber'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        CREDIT CARD NUMBER
                                      </label>
                                      <Controller
                                        name='ccNumber'
                                        control={creditCardControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
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
                                                (e.nativeEvent as _CustomEvent)
                                                  .inputType ===
                                                  'deleteContentBackward' &&
                                                e.currentTarget.value === ''
                                              ) {
                                                setCreditCardFieldValue(
                                                  'expiryMonth',
                                                  '',
                                                );
                                                setCreditCardFieldValue(
                                                  'expiryYear',
                                                  '',
                                                );
                                                setCreditCardFieldValue(
                                                  'cvc',
                                                  '',
                                                );
                                              }
                                              if (
                                                Number(e.target.value) ||
                                                e.target.value === ''
                                              ) {
                                                onChange(e);
                                              }

                                              // setCreditCardFieldValue(
                                              //   'ccNumber',
                                              //   e.target.value,
                                              // );
                                            }}
                                            touched={
                                              !!creditCardTouchedFields.ccNumber
                                            }
                                            creditCard={true}
                                            onBlur={onBlur}
                                            error={!!errors?.ccNumber}
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className='flex flex-wrap mx-[-15px]'>
                                      <div className='md:w-4/12 w-full px-[15px] mb-[20px]'>
                                        <label
                                          htmlFor='expiryMonth'
                                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                        >
                                          MONTH
                                        </label>
                                        <Controller
                                          name='expiryMonth'
                                          control={creditCardControl}
                                          render={({
                                            field: { value, onChange, onBlur },
                                          }) => (
                                            <CheckoutSelectInput
                                              label='MONTH'
                                              additionalClass={'md:w-6/12'}
                                              autoComplete='cc-exp-month'
                                              name={'expiryMonth'}
                                              initialOption={'Month*'}
                                              required={true}
                                              value={value}
                                              onChange={
                                                customMonthChangehandler
                                              }
                                              disabled={false}
                                              onBlur={onBlur}
                                              valid={
                                                value !== '' &&
                                                !!errors?.expiryMonth
                                              }
                                              inValid={
                                                value === '' &&
                                                !!errors?.expiryMonth
                                              }
                                              options={monthOptions}
                                            />
                                          )}
                                        />
                                      </div>
                                      <div className='md:w-4/12 w-full px-[15px] mb-[20px]'>
                                        <label
                                          htmlFor='expiryYear'
                                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                        >
                                          YEAR
                                        </label>
                                        <Controller
                                          name='expiryYear'
                                          control={creditCardControl}
                                          render={({
                                            field: { value, onChange, onBlur },
                                          }) => (
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
                                              valid={
                                                value !== '' &&
                                                !!errors?.expiryYear
                                              }
                                              inValid={
                                                value === '' &&
                                                !!errors?.expiryYear
                                              }
                                              options={yearOptions}
                                            />
                                          )}
                                        />
                                      </div>
                                      <div className='md:w-4/12 w-full px-[15px] mb-[20px]'>
                                        <label
                                          htmlFor='cvc'
                                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                        >
                                          CVV
                                          <span className='bg-primary text-[#ffffff] rounded-full inline-block text-center text-[14px] w-[18px] leading-[18px] h-[18px]'>
                                            i
                                          </span>
                                        </label>

                                        <Controller
                                          name='cvc'
                                          control={creditCardControl}
                                          render={({
                                            field: { value, onChange, onBlur },
                                          }) => (
                                            <CheckoutTextInput
                                              label='Security Code(CVV/CVC)'
                                              placeHolder='Security Code*'
                                              additionalClass={'md:w-6/12'}
                                              type={'text'}
                                              autoComplete='cc-csc'
                                              name={'cvc'}
                                              required={true}
                                              value={value}
                                              length={maxLengthCalculator(
                                                'cvc',
                                                credirCardFieldValues()
                                                  .ccNumber,
                                              )}
                                              onBlur={onBlur}
                                              onChange={(event) => {
                                                if (isNumberKey(event)) {
                                                  onChange(event);
                                                }
                                              }}
                                              touched={
                                                !!creditCardTouchedFields.cvc
                                              }
                                              error={!!errors?.cvc}
                                            />
                                          )}
                                        />
                                      </div>
                                    </div>
                                    {/* <div>
                                    <button
                                      onClick={() => {}}
                                      className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                    >
                                      Save
                                    </button>
                                  </div> */}
                                  </div>

                                  <div
                                    className='mt-[20px]'
                                    x-data='{checkbox : false}'
                                  >
                                    {/* <div className='lg:pl-[25px] pl-0 flex items-center mb-[20px]'>
                                  <input
                                    id='SameAsShippingAddress-0'
                                    name='SameAsShippingAddress[]'
                                    checked={isGiftCardAvailable}
                                    onChange={(e) => handleGiftCheckBoxClick(e)}
                                    type='checkbox'
                                    className='h-4 w-4 border-gray-300 rounded'
                                  />
                                  <label
                                    htmlFor='SameAsShippingAddress-0'
                                    className='ml-[10px] text-small-text'
                                  >
                                    I have a gift card
                                  </label>
                                </div> */}

                                    <ApplyGiftCard
                                      applyGiftCardDiscount={
                                        applyGiftCardDiscount
                                      }
                                      balance={balance}
                                      giftCardAmount={giftCardAmount}
                                      giftCardValue={giftCardValue}
                                      giftCouponNameChangeHandler={
                                        giftCouponNameChangeHandler
                                      }
                                    />

                                    <div className='flex flex-wrap justify-end items-center'>
                                      {isEmployeeLoggedIn && (
                                        <div className='mb-[20px] mr-[15px] sm:mb-0'>
                                          <button
                                            onClick={handleSkipPaymentMethod}
                                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                          >
                                            Skip
                                          </button>
                                        </div>
                                      )}

                                      <div className='mb-[20px] sm:mb-0'>
                                        <button
                                          type='submit'
                                          className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                        >
                                          Continue
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              )}
                            {method == 'Paypal' && (
                              <div className='text-small-text mb-[15px]'>
                                After clicking "Pay with PayPal", you will be
                                redirected to PayPal to complete your purchase
                                securely.
                              </div>
                            )}
                            {usedStoreCredits !== orderTotal - giftCardAmount &&
                              method === 'Paypal' && (
                                <div className='mt-[20px]'>
                                  <ApplyGiftCard
                                    applyGiftCardDiscount={
                                      applyGiftCardDiscount
                                    }
                                    balance={balance}
                                    giftCardAmount={giftCardAmount}
                                    giftCardValue={giftCardValue}
                                    giftCouponNameChangeHandler={
                                      giftCouponNameChangeHandler
                                    }
                                  />
                                  <div className='flex flex-wrap justify-end items-center'>
                                    {isEmployeeLoggedIn && (
                                      <div className='mb-[20px] mr-[15px] sm:mb-0'>
                                        <button
                                          onClick={handleSkipPaymentMethod}
                                          className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                        >
                                          Skip
                                        </button>
                                      </div>
                                    )}

                                    <div className='mb-[20px] sm:mb-0'>
                                      <button
                                        onClick={() =>
                                          dispatch(
                                            update_PaymentDetails({
                                              method: 'CHECKOUT_PAYMENT_SAVED',
                                              value: true,
                                            }),
                                          )
                                        }
                                        className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                      >
                                        Continue
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
                            {(useStoreCredit &&
                              usedStoreCredits?.toFixed(2) ==
                                (orderTotal - giftCardAmount + tax).toFixed(
                                  2,
                                )) ||
                            orderTotal + tax - giftCardAmount === 0 ? (
                              <div
                                className='mt-[20px]'
                                x-data='{checkbox : false}'
                              >
                                {usedStoreCredits?.toFixed(2) !==
                                  (orderTotal - giftCardAmount + tax).toFixed(
                                    2,
                                  ) ||
                                  (giftCardNumber && (
                                    <ApplyGiftCard
                                      applyGiftCardDiscount={
                                        applyGiftCardDiscount
                                      }
                                      balance={balance}
                                      giftCardAmount={giftCardAmount}
                                      giftCardValue={giftCardValue}
                                      giftCouponNameChangeHandler={
                                        giftCouponNameChangeHandler
                                      }
                                    />
                                  ))}
                                <div className='flex flex-wrap justify-end items-center'>
                                  {isEmployeeLoggedIn && (
                                    <div className='mb-[20px] mr-[15px] sm:mb-0'>
                                      <button
                                        onClick={handleSkipPaymentMethod}
                                        className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                      >
                                        Skip
                                      </button>
                                    </div>
                                  )}

                                  <div className='mb-[20px] sm:mb-0'>
                                    <button
                                      onClick={() =>
                                        dispatch(
                                          update_PaymentDetails({
                                            method: 'CHECKOUT_PAYMENT_SAVED',
                                            value: true,
                                          }),
                                        )
                                      }
                                      className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                    >
                                      Continue
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            );
          },
        }}
      />
    </>
  );
};

export default PaymentComponent;
