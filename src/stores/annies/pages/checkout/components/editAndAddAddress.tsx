import { useAppSelector } from '@/app/redux/hooks';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { _AddAddressType } from '@/features/checkout/checkoutController/addressController';
import { ModalScreens } from '@/features/checkout/checkoutController/config';
import { _Country } from '@/shared/apis/checkout/fetchCountriesList';
import { _State } from '@/shared/apis/checkout/fetchStateList';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { CheckoutSelectInput, CheckoutTextInput } from './checkoutInputs';

interface props extends _AddAddressType {
  modal: 'ADDBILLING' | 'ADDSHIPPING' | 'EDITBILLING' | 'EDITSHIPPING';
  onChangeHandler: (name: ModalScreens) => void;
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerProps<TFieldValues, TName>,
  ) => import('react').ReactElement<
    any,
    string | import('react').JSXElementConstructor<any>
  >;
  states: _State[];
  countries: _Country[];
  postalCodeHandler: (
    e: React.FocusEvent<HTMLInputElement>,
    addressType: string,
  ) => void;
  countryHandler: (
    e: React.ChangeEvent<HTMLSelectElement>,
    addressType: string,
  ) => void;
}
const AddAddressModal = ({
  modal,
  addAddressSubmitHandle,
  addAddressControl,
  addAddressValues,
  addAddressErrors,
  addAddressTouchedFields,
  Controller,
  onChangeHandler,
  states,
  countries,
  postalCodeHandler,
  countryHandler,
  addAddressRequestHandler,
}: props) => {
  const { shipping, billing } = useAppSelector(
    (state) => state.checkout.address,
  );

  const dispatch = useDispatch();

  const editOrAdd = () => {
    if (modal === 'EDITBILLING' || modal === 'EDITSHIPPING') {
      return 'Edit';
    }
    return 'Add';
  };

  const shipOrBill = () => {
    if (modal === 'EDITBILLING' || modal === 'ADDBILLING') {
      return 'Billing ';
    }
    return 'Shipping ';
  };

  return (
    <div
      id='billingaddressModal'
      className='overflow-y-auto overflow-x-hidden fixed z-50 justify-center items-center h-modal inset-0'
    >
      <div className='w-full h-full bg-[#000000] bg-opacity-[0.50] flex items-center justify-center'>
        <div className='relative px-[16px] w-full max-w-4xl h-full md:h-auto'>
          <div className='relative bg-[#ffffff] shadow max-h-screen overflow-y-auto h-full'>
            <div className='flex justify-between items-start p-[25px] rounded-t border-b sticky top-0 left-0 bg-[#ffffff]'>
              <div className='font-[600] text-sub-text'>
                {editOrAdd()} {shipOrBill()}
                Address
              </div>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-[14px] p-[6px] ml-auto inline-flex items-center'
                data-modal-toggle='billingaddressModal'
                onClick={() => onChangeHandler(null)}
              >
                <svg
                  className='w-[24px] h-[24px]'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fill-rule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </button>
            </div>
            <div className='p-[25px]'>
              <form
                onSubmit={(e) => {
                  addAddressSubmitHandle(
                    () => {
                      if (modal === 'ADDBILLING' || modal === 'ADDSHIPPING') {
                        addAddressRequestHandler('ADD');
                      } else {
                        addAddressRequestHandler('UPDATE');
                      }
                    },
                    () =>
                      dispatch(
                        openAlertModal({
                          title: 'Error',
                          description: 'Something Went Wrong in Billing Form',
                          isAlertModalOpen: true,
                        }),
                      ),
                  )(e);
                }}
              >
                <div className=''>
                  <div className='lg:pl-[25px]  pl-0 mt-[30px]'>
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
                          control={addAddressControl}
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
                              touched={!!addAddressTouchedFields.firstname}
                              error={!!addAddressErrors.firstname}
                            />
                          )}
                        />
                      </div>
                      <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='lastName'
                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                        >
                          LAST NAME <span className='text-rose-600'>*</span>
                        </label>
                        <Controller
                          name='lastName'
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
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
                              touched={!!addAddressTouchedFields.lastName}
                              error={!!addAddressErrors.lastName}
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
                          ADDRESS LINE 1<span className='text-rose-600'>*</span>
                        </label>
                        <Controller
                          name='address1'
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CheckoutTextInput
                              placeHolder='Address Line1'
                              label='STREET ADDRESS'
                              additionalClass={''}
                              length={35}
                              type={'text'}
                              name={'address1'}
                              required={true}
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              autoComplete='address-line3'
                              touched={!!addAddressTouchedFields.address1}
                              error={!!addAddressErrors.address1}
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
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
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
                              touched={!!addAddressTouchedFields.address2}
                              error={!!addAddressErrors.address2}
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
                          CITY <span className='text-rose-600'>*</span>
                        </label>
                        <Controller
                          name='city'
                          control={addAddressControl}
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
                              touched={!!addAddressTouchedFields.city}
                              error={!!addAddressErrors.city}
                            />
                          )}
                        />
                      </div>
                      <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='state'
                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                        >
                          STATE <span className='text-rose-600'>*</span>
                        </label>
                        <Controller
                          name='state'
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
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
                                !!addAddressTouchedFields.state &&
                                value !== '' &&
                                !!addAddressErrors.state
                              }
                              inValid={!!addAddressErrors.state}
                              options={states}
                            />
                          )}
                        />
                      </div>
                      <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='countryName'
                          className='block text-small-text mb-[5px] font-bold'
                        >
                          Country <span className='text-rose-600'>*</span>
                        </label>
                        <Controller
                          name='countryName'
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
                            <CheckoutSelectInput
                              label='COUNTRY'
                              additionalClass={'md:w-6/12'}
                              autoComplete='country-name'
                              name={'countryName'}
                              initialOption={'Select Country*'}
                              required={true}
                              value={value}
                              onChange={(e) => {
                                countryHandler(e, 'ADD');
                              }}
                              onBlur={onBlur}
                              disabled={false}
                              valid={
                                !!addAddressTouchedFields.countryCode &&
                                value !== '' &&
                                !!addAddressErrors?.countryCode
                              }
                              inValid={!!addAddressErrors.countryCode}
                              options={countries}
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
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
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
                                postalCodeHandler(e, 'ADD');
                              }}
                              touched={!!addAddressTouchedFields.postalCode}
                              error={!!addAddressErrors.postalCode}
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
                          EMAIL <span className='text-rose-600'>*</span>
                        </label>
                        <Controller
                          name='email'
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
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
                              touched={!!addAddressTouchedFields.email}
                              error={!!addAddressErrors?.email}
                            />
                          )}
                        />
                      </div>
                      <div className='md:w-6/12 w-full px-[15px] mb-[20px]'>
                        <label
                          htmlFor='phone'
                          className='block text-small-text mb-[5px] ml-[15px] font-bold'
                        >
                          PHONE <span className='text-rose-600'>*</span>
                        </label>
                        <Controller
                          name='phone'
                          control={addAddressControl}
                          render={({ field: { value, onChange, onBlur } }) => (
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
                              touched={!!addAddressTouchedFields.phone}
                              error={!!addAddressErrors?.phone}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className='flex flex-wrap justify-end items-center'>
                      <div className='mb-[20px] mr-[20px] sm:mb-0'>
                        {modal === 'ADDBILLING' || modal === 'ADDSHIPPING' ? (
                          <button
                            type='submit'
                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                          >
                            ADD NEW ADDRESS
                          </button>
                        ) : (
                          <button
                            type='submit'
                            className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                          >
                            UPDATE ADDRESS
                          </button>
                        )}
                      </div>
                      <div className='mb-[20px] sm:mb-0'>
                        <button
                          data-modal-toggle='billingaddressModal'
                          type='button'
                          className='btn btn-secondary btn-sm uppercase !font-body !rounded-xs cursor-pointer'
                          onClick={() => onChangeHandler(null)}
                        >
                          CANCEL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
