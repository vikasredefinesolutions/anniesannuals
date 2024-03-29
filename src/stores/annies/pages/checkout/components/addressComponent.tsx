import { useAppSelector } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import CheckoutAddressController from '@/features/checkout/checkoutController/addressController';
import { useDispatch } from 'react-redux';
import ChangeAddressModal from './changeAddress';
import { CheckoutSelectInput, CheckoutTextInput } from './checkoutInputs';
import CheckoutModal from './checkoutModal';
import AddAddressModal from './editAndAddAddress';

const AddressComponent = () => {
  const { checkoutAddressSaved, useBillingAddressForShipping } = useAppSelector(
    (state) => state.checkout.address,
  );

  const {
    required: GuestRequired,
    showCreateAccountScreen,
    showPasswordScreen,
  } = useAppSelector((state) => state.checkout.guestCheckout);

  const dispatch = useDispatch();
  return (
    <>
      <CheckoutAddressController
        cases={{
          ready: ({
            Controller,
            shippingErrors,
            billingErrors,
            billingTouchedFields,
            shippingTouchedFields,
            countries,
            billingControl,
            shippingControl,
            states,
            postalCodeHandler,
            countryHandler,
            handleShippingAsBilling,
            sendSpecialOffersHandler,
            addressOnSubmit,
            billingSubmitHandle,
            shippingSubmitHandle,
            shippingValues,
            billingValues,
            editAddress,
            shippingAddress,
            billingAddress,
            onChangeHandler,
            modal,
            addressClickHandler,
            removeItems,
            removeMessage,
            showRemoveModal,
            addAddressSubmitHandle,
            addAddressControl,
            addAddressValues,
            addAddressErrors,
            addAddressTouchedFields,
            addAddressRequestHandler,
          }) => {
            return (
              <>
                <div className='pb-[15px] mb-[15px] border-b border-b-[#D4CEB9]'>
                  {checkoutAddressSaved ? (
                    <div className=''>
                      <div className='flex justify-between items-center'>
                        <div className='font-sub font-bold text-sub-text mb-[30px] flex flex-wrap items-center'>
                          <span className='material-icons text-[#388C1D] mr-[5px] align-middle'>
                            check_circle
                          </span>
                          Billing and Shipping Address
                        </div>
                        <div className='mb-[30px]'>
                          <button
                            onClick={() => editAddress()}
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
                        <div className='flex flex-wrap mx-[-15px]'>
                          <div className='md:w-6/12 w-full px-[15px] mb-[20px] md:mb-0'>
                            <div className='font-sub font-bold text-normal-text mb-[15px] flex align-center justify-between'>
                              <div>Billing Address:</div>
                              {billingAddress.length > 1 && (
                                <button
                                  className='mr-[5px] align-middle text-[#3B5697] font-normal underline'
                                  onClick={() => onChangeHandler('BILLING')}
                                >
                                  Change
                                </button>
                              )}
                            </div>
                            <div className='text-default-text !leading-[28px]'>
                              {billingValues().firstname}{' '}
                              {billingValues()?.lastName}
                              <br />
                              {billingValues()?.address1},{' '}
                              {billingValues()?.address2 !== ''
                                ? billingValues()?.address2
                                : ''}
                              <br />
                              {billingValues()?.city} <br />
                              {billingValues()?.state},{' '}
                              {billingValues()?.countryName},{' '}
                              {billingValues()?.postalCode}
                              <br />
                              Ph: {billingValues()?.phone}
                              <br />
                              {billingValues()?.email}
                            </div>
                            <div className='mt-[20px] mb-[20px] sm:mb-0'>
                              <button
                                onClick={() => onChangeHandler('ADDBILLING')}
                                className='px-[20px] py-[5px] border border-default text-default text-[14px] rounded-full font-bold'
                              >
                                + Add a new Billing Address
                              </button>
                            </div>
                          </div>
                          <div className='md:w-6/12 w-full px-[15px] mb-[20px] md:mb-0'>
                            <div className='font-sub font-bold text-normal-text mb-[15px] flex align-center justify-between'>
                              <div>Shipping Address:</div>
                              {shippingAddress.length > 1 && (
                                <button
                                  className='mr-[5px] align-middle text-[#3B5697] font-normal underline'
                                  onClick={() => onChangeHandler('SHIPPING')}
                                >
                                  Change
                                </button>
                              )}
                            </div>

                            <div className='text-default-text !leading-[28px]'>
                              {useBillingAddressForShipping
                                ? billingValues().firstname
                                : shippingValues()?.firstname}{' '}
                              {useBillingAddressForShipping
                                ? billingValues().lastName
                                : shippingValues()?.lastName}
                              <br />
                              {useBillingAddressForShipping
                                ? billingValues().address1
                                : shippingValues()?.address1}
                              ,{' '}
                              {useBillingAddressForShipping
                                ? billingValues()?.address2 !== ''
                                  ? billingValues()?.address2
                                  : ''
                                : shippingValues()?.address2 !== ''
                                ? shippingValues()?.address2
                                : ''}
                              <br />
                              {useBillingAddressForShipping
                                ? billingValues().city
                                : shippingValues()?.city}{' '}
                              <br />
                              {useBillingAddressForShipping
                                ? billingValues().state
                                : shippingValues()?.state}
                              ,{' '}
                              {useBillingAddressForShipping
                                ? billingValues().countryName
                                : shippingValues()?.countryName}{' '}
                              {useBillingAddressForShipping
                                ? billingValues().postalCode
                                : shippingValues()?.postalCode}
                              <br />
                              Ph:{' '}
                              {useBillingAddressForShipping
                                ? billingValues().phone
                                : shippingValues()?.phone}
                              <br />
                              {useBillingAddressForShipping
                                ? billingValues().email
                                : shippingValues()?.email}
                            </div>

                            <div className='mt-[20px] mb-[20px] sm:mb-0'>
                              <button
                                onClick={() => onChangeHandler('ADDSHIPPING')}
                                className='px-[20px] py-[5px] border border-default text-default text-[14px] rounded-full font-bold'
                              >
                                + Add a new Shipping Address
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        billingSubmitHandle(
                          () => {
                            if (useBillingAddressForShipping) {
                              addressOnSubmit();
                            } else {
                              shippingSubmitHandle(addressOnSubmit, () =>
                                dispatch(
                                  openAlertModal({
                                    title: 'Error',
                                    description:
                                      'Something Went wrong in Shipping Form',
                                    isAlertModalOpen: true,
                                  }),
                                ),
                              )(e);
                            }
                          },
                          () =>
                            dispatch(
                              openAlertModal({
                                title: 'Error',
                                description:
                                  'Something Went Wrong in Billing Form',
                                isAlertModalOpen: true,
                              }),
                            ),
                        )(e);
                      }}
                    >
                      <div className=''>
                        <div className='font-sub font-bold text-sub-text'>
                          1. Billing and Shipping Address
                        </div>
                        {!(
                          GuestRequired ||
                          showCreateAccountScreen ||
                          showPasswordScreen
                        ) && (
                          <>
                            <div className='lg:pl-[25px]  pl-0 mt-[30px]'>
                              <div className='font-sub font-bold text-normal-text mb-[15px]'>
                                Billing Address:
                              </div>

                              <div className='flex flex-wrap mx-[-15px]'>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='firstname'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                                  >
                                    FIRST NAME
                                    <span className='text-rose-600'>*</span>
                                  </label>

                                  <Controller
                                    name='firstname'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
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
                                        touched={
                                          !!billingTouchedFields.firstname
                                        }
                                        error={!!billingErrors.firstname}
                                        errorMsg={
                                          billingErrors?.firstname?.message
                                        }
                                      />
                                    )}
                                  />
                                </div>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='lastName'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    LAST NAME{' '}
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='lastName'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutTextInput
                                        placeHolder='Last Name'
                                        label='LAST NAME'
                                        additionalClass={'md:w-6/12'}
                                        type={'text'}
                                        name={'lastName'}
                                        autoComplete='family-name'
                                        required={true}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        touched={
                                          !!billingTouchedFields.lastName
                                        }
                                        error={!!billingErrors.lastName}
                                        errorMsg={
                                          billingErrors?.lastName?.message
                                        }
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-wrap mx-[-15px]'>
                                <div className='w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='address1'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    ADDRESS LINE 1
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='address1'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutTextInput
                                        placeHolder='Address Line1'
                                        label='STREET ADDRESS'
                                        length={35}
                                        additionalClass={''}
                                        type={'text'}
                                        name={'address1'}
                                        required={true}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        autoComplete='address-line3'
                                        touched={
                                          !!billingTouchedFields.address1
                                        }
                                        error={!!billingErrors.address1}
                                        errorMsg={
                                          billingErrors?.address1?.message
                                        }
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-wrap mx-[-15px]'>
                                <div className='w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='address2'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    ADDRESS LINE 2 (optional)
                                  </label>
                                  <Controller
                                    name='address2'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutTextInput
                                        placeHolder=''
                                        label='Address 2'
                                        additionalClass={'md:w-6/12'}
                                        length={35}
                                        type={'text'}
                                        name={'address2'}
                                        autoComplete='address-level2'
                                        required={false}
                                        value={value || ''}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        touched={
                                          !!billingTouchedFields.address2
                                        }
                                        error={!!billingErrors.address2}
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-wrap mx-[-15px]'>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='city'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    CITY{' '}
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='city'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
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
                                        errorMsg={billingErrors?.city?.message}
                                      />
                                    )}
                                  />
                                </div>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='state'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    STATE{' '}
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='state'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutSelectInput
                                        label='STATE / PROVINCE'
                                        additionalClass={'md:w-6/12'}
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
                                        errorMsg={billingErrors?.state?.message}
                                      />
                                    )}
                                  />
                                </div>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='countryName'
                                    className='block text-small-text mb-[5px] font-bold'
                                  >
                                    Country{' '}
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='countryName'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutSelectInput
                                        label='COUNTRY'
                                        additionalClass={'md:w-6/12'}
                                        autoComplete='country-name'
                                        name={'countryName'}
                                        initialOption={'Select Country*'}
                                        required={true}
                                        value={value}
                                        onChange={(e) => {
                                          countryHandler(e, 'BILL');
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
                                        errorMsg={
                                          billingErrors?.countryCode?.message
                                        }
                                      />
                                    )}
                                  />
                                </div>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='postalCode'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    Zip/Postal Code
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='postalCode'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutTextInput
                                        placeHolder='Zip Code'
                                        label='ZIP CODE'
                                        additionalClass={'md:w-6/12'}
                                        type={'text'}
                                        name={'postalCode'}
                                        required={true}
                                        value={value}
                                        autoComplete='postal-code'
                                        onChange={onChange}
                                        onBlur={(e) => {
                                          postalCodeHandler(e, 'BILL');
                                        }}
                                        touched={
                                          !!billingTouchedFields.postalCode
                                        }
                                        error={!!billingErrors.postalCode}
                                        errorMsg={
                                          billingErrors?.postalCode?.message
                                        }
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                              <div className='flex flex-wrap mx-[-15px]'>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='email'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    EMAIL{' '}
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='email'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutTextInput
                                        placeHolder='Email'
                                        label='EMAIL'
                                        additionalClass={'md:w-6/12'}
                                        type={'text'}
                                        name={'email'}
                                        required={true}
                                        value={value}
                                        autoComplete='email'
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        touched={!!billingTouchedFields.email}
                                        error={!!billingErrors?.email}
                                        errorMsg={billingErrors?.email?.message}
                                      />
                                    )}
                                  />
                                </div>
                                <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                  <label
                                    htmlFor='phone'
                                    className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                  >
                                    PHONE{' '}
                                    <span className='text-rose-600'>*</span>
                                  </label>
                                  <Controller
                                    name='phone'
                                    control={billingControl}
                                    render={({
                                      field: { value, onChange, onBlur },
                                    }) => (
                                      <CheckoutTextInput
                                        placeHolder='Phone Number'
                                        label='PHONE NUMBER'
                                        additionalClass={'md:w-6/12'}
                                        type={'text'}
                                        name={'phone'}
                                        required={true}
                                        autoComplete='tel'
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        touched={!!billingTouchedFields.phone}
                                        error={!!billingErrors?.phone}
                                        errorMsg={billingErrors?.phone?.message}
                                      />
                                    )}
                                  />
                                </div>
                              </div>
                              {/* <div className='flex items-center mb-[40px]'>
                            <input
                              id='SpecialOffers-0'
                              name='SpecialOffers[]'
                              checked={sendOfferEmail}
                              type='checkbox'
                              onChange={(e) => sendSpecialOffersHandler(e)}
                              className='h-4 w-4 border-gray-300 rounded'
                            />
                            <label
                              htmlFor='SpecialOffers-0'
                              className='ml-[10px] text-small-text'
                            >
                              Please send me special offers and deals via email
                            </label>
                          </div> */}
                            </div>

                            <div
                              className='lg:pl-[25px] pl-0'
                              x-data='{checkbox : true}'
                            >
                              <div className='font-sub font-bold text-normal-text mb-[15px]'>
                                Shipping Address:
                              </div>
                              <div className='flex items-center mb-[10px]'>
                                <input
                                  id='SameAsShippingAddress-0'
                                  name='SameAsShippingAddress[]'
                                  x-model='checkbox'
                                  onChange={(e) => handleShippingAsBilling(e)}
                                  checked={useBillingAddressForShipping}
                                  type='checkbox'
                                  className='h-4 w-4 border-gray-300 rounded'
                                />
                                <label
                                  htmlFor='SameAsShippingAddress-0'
                                  className='ml-[10px] text-small-text'
                                >
                                  Shipping Address same as Billing Address
                                </label>
                              </div>
                              {!useBillingAddressForShipping && (
                                <div className='pt-[40px]' id=''>
                                  <div className='flex flex-wrap mx-[-15px]'>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='firstname'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold text-anchor'
                                      >
                                        FIRST NAME
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='firstname'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
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
                                            touched={
                                              !!shippingTouchedFields.firstname
                                            }
                                            error={!!shippingErrors.firstname}
                                            errorMsg={
                                              shippingErrors?.firstname?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='lastName'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        LAST NAME{' '}
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='lastName'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutTextInput
                                            placeHolder='Last Name'
                                            label='LAST NAME'
                                            additionalClass={'md:w-6/12'}
                                            type={'text'}
                                            name={'lastName'}
                                            autoComplete='family-name'
                                            required={true}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            touched={
                                              !!shippingTouchedFields.lastName
                                            }
                                            error={!!shippingErrors.lastName}
                                            errorMsg={
                                              shippingErrors?.lastName?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className='flex flex-wrap mx-[-15px]'>
                                    <div className='w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='address1'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        ADDRESS LINE 1
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='address1'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutTextInput
                                            placeHolder='Address Line1'
                                            label='STREET ADDRESS'
                                            additionalClass={''}
                                            type={'text'}
                                            name={'address1'}
                                            required={true}
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            autoComplete='address-line3'
                                            touched={
                                              !!shippingTouchedFields.address1
                                            }
                                            error={!!shippingErrors.address1}
                                            errorMsg={
                                              shippingErrors?.address1?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className='flex flex-wrap mx-[-15px]'>
                                    <div className='w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='address2'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        ADDRESS LINE 2 (optional)
                                      </label>
                                      <Controller
                                        name='address2'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutTextInput
                                            placeHolder=''
                                            label='Address 2'
                                            additionalClass={'md:w-6/12'}
                                            type={'text'}
                                            name={'address2'}
                                            autoComplete='address-level2'
                                            required={false}
                                            value={value || ''}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            touched={
                                              !!shippingTouchedFields.address2
                                            }
                                            error={!!shippingErrors.address2}
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className='flex flex-wrap mx-[-15px]'>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='city'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        CITY{' '}
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='city'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
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
                                            touched={
                                              !!shippingTouchedFields.city
                                            }
                                            error={!!shippingErrors.city}
                                            errorMsg={
                                              shippingErrors?.city?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='state'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        STATE{' '}
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='state'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutSelectInput
                                            label='STATE / PROVINCE'
                                            additionalClass={'md:w-6/12'}
                                            name={'state'}
                                            required={true}
                                            initialOption={'State / Province*'}
                                            autoComplete='address-level1'
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            disabled={false}
                                            valid={
                                              !!shippingTouchedFields.state &&
                                              value !== '' &&
                                              !!shippingErrors.state
                                            }
                                            inValid={
                                              !!shippingTouchedFields.state &&
                                              value === ''
                                            }
                                            options={states}
                                            errorMsg={
                                              shippingErrors?.state?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='countryName'
                                        className='block text-small-text mb-[5px] font-bold'
                                      >
                                        Country{' '}
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='countryName'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutSelectInput
                                            label='COUNTRY'
                                            additionalClass={'md:w-6/12'}
                                            autoComplete='country-name'
                                            name={'countryName'}
                                            initialOption={'Select Country*'}
                                            required={true}
                                            value={value}
                                            onChange={(e) => {
                                              countryHandler(e, 'BILL');
                                            }}
                                            onBlur={onBlur}
                                            disabled={false}
                                            valid={
                                              !!shippingTouchedFields.countryCode &&
                                              value !== '' &&
                                              !!shippingErrors?.countryCode
                                            }
                                            inValid={
                                              !!shippingTouchedFields.countryCode &&
                                              value === ''
                                            }
                                            options={countries}
                                            errorMsg={
                                              shippingErrors?.countryCode
                                                ?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='postalCode'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        Zip/Postal Code
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='postalCode'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutTextInput
                                            placeHolder='Zip Code'
                                            label='ZIP CODE'
                                            additionalClass={'md:w-6/12'}
                                            type={'text'}
                                            name={'postalCode'}
                                            required={true}
                                            value={value}
                                            autoComplete='postal-code'
                                            onChange={onChange}
                                            onBlur={(e) =>
                                              postalCodeHandler(e, 'SHIP')
                                            }
                                            touched={
                                              !!shippingTouchedFields.postalCode
                                            }
                                            error={!!shippingErrors.postalCode}
                                            errorMsg={
                                              shippingErrors?.postalCode
                                                ?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className='flex flex-wrap mx-[-15px]'>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='email'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        EMAIL{' '}
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='email'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutTextInput
                                            placeHolder='Email'
                                            label='EMAIL'
                                            additionalClass={'md:w-6/12'}
                                            type={'text'}
                                            name={'email'}
                                            required={true}
                                            value={value}
                                            autoComplete='email'
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            touched={
                                              !!shippingTouchedFields.email
                                            }
                                            error={!!shippingErrors?.email}
                                            errorMsg={
                                              shippingErrors?.email?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                    <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                                      <label
                                        htmlFor='phone'
                                        className='block text-small-text mb-[5px] ml-[15px] font-bold'
                                      >
                                        PHONE{' '}
                                        <span className='text-rose-600'>*</span>
                                      </label>
                                      <Controller
                                        name='phone'
                                        control={shippingControl}
                                        render={({
                                          field: { value, onChange, onBlur },
                                        }) => (
                                          <CheckoutTextInput
                                            placeHolder='Phone Number'
                                            label='PHONE NUMBER'
                                            additionalClass={'md:w-6/12'}
                                            type={'text'}
                                            name={'phone'}
                                            required={true}
                                            autoComplete='tel'
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            touched={
                                              !!shippingTouchedFields.phone
                                            }
                                            error={!!shippingErrors?.phone}
                                            errorMsg={
                                              shippingErrors?.phone?.message
                                            }
                                          />
                                        )}
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}
                              <div className='flex flex-wrap justify-end items-center'>
                                <div className='mb-[20px] sm:mb-0'>
                                  <button
                                    type='submit'
                                    // onClick={() => {
                                    //   if (
                                    //     useBillingAddressForShipping &&
                                    //     billingFormValid
                                    //   ) {
                                    //     addressOnSubmit();
                                    //   } else {
                                    //     if (shippingFormValid && billingFormValid) {
                                    //       addressOnSubmit();
                                    //     } else {
                                    //       console.log('i am inside');
                                    //       billingSubmitHandle(addressOnSubmit);
                                    //       shippingSubmitHandle(addressOnSubmit);
                                    //     }
                                    //   }
                                    // }}
                                    className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                                  >
                                    Continue
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </form>
                  )}
                </div>
                {modal === 'SHIPPING' && (
                  <ChangeAddressModal
                    onChangeHandler={onChangeHandler}
                    address={shippingAddress}
                    modal={modal}
                    addressClickHandler={addressClickHandler}
                  />
                )}
                {modal === 'BILLING' && (
                  <ChangeAddressModal
                    onChangeHandler={onChangeHandler}
                    address={billingAddress}
                    modal={modal}
                    addressClickHandler={addressClickHandler}
                  />
                )}
                {(modal === 'ADDSHIPPING' ||
                  modal === 'ADDBILLING' ||
                  modal === 'EDITBILLING' ||
                  modal === 'EDITSHIPPING') && (
                  <AddAddressModal
                    modal={modal}
                    addAddressSubmitHandle={addAddressSubmitHandle}
                    addAddressControl={addAddressControl}
                    addAddressValues={addAddressValues}
                    addAddressErrors={addAddressErrors}
                    addAddressTouchedFields={addAddressTouchedFields}
                    onChangeHandler={onChangeHandler}
                    Controller={Controller}
                    states={states}
                    countries={countries}
                    postalCodeHandler={postalCodeHandler}
                    countryHandler={countryHandler}
                    addAddressRequestHandler={addAddressRequestHandler}
                  />
                )}

                {showRemoveModal && (
                  <CheckoutModal
                    message={removeMessage}
                    removeItems={removeItems}
                    editAddress={editAddress}
                  />
                )}
              </>
            );
          },
        }}
      />
    </>
  );
};

export default AddressComponent;
