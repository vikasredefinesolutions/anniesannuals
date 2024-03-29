import Input from '@/components/common/input';
import { _ActiveTabs } from '@/features/myAccount/address/controller';
import Image from '@/shared/Components/Image';
import { _Country } from '@/shared/apis/checkout/fetchCountriesList';
import { _State } from '@/shared/apis/checkout/fetchStateList';
import { _AddressObj } from '@/shared/apis/user/fetchUserDetails';
import React, { ChangeEvent, Fragment } from 'react';

interface _Props {
  onSubmit: any;
  hookForm: { errors?: any; register: any; handleSubmit: any };
  billingAddressPrimary: boolean;
  setBillingAddressPrimary: React.Dispatch<React.SetStateAction<boolean>>;
  shippingAddressPrimary: boolean;
  setShippingAddressPrimary: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: _ActiveTabs;
  setActiveTab: React.Dispatch<React.SetStateAction<_ActiveTabs>>;
  countryData: _Country[] | null;
  stateData: _State[] | null;
  setStateData: React.Dispatch<
    React.SetStateAction<_State[] | null | undefined>
  >;
  selectedCountry: {
    name: string;
    code: string;
    id: string;
  };
  setSelectedCountry: React.Dispatch<
    React.SetStateAction<{
      name: string;
      code: string;
      id: string;
    }>
  >;
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
  billingAddress: _AddressObj[];
  shippingAddress: _AddressObj[];
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  deleteAddress: any;
  setUpEditForm: (formObj: any) => void;
  selectedState: string;
  makePrimaryAddress: (
    addressObject: _AddressObj,
    addressStatus: boolean,
  ) => void;
  cancellForm: () => void;
  Controller: any;
  control: any;
  zipCodeHandler: any;
  getCurrentCountryStateData: any;
  setValue: any;
}

const MyAddress: React.FC<_Props> = (_Props) => {
  const {
    onSubmit,
    hookForm: { errors, register, handleSubmit },
    billingAddressPrimary,
    setBillingAddressPrimary,
    shippingAddressPrimary,
    setShippingAddressPrimary,
    activeTab,
    setActiveTab,
    countryData,
    stateData,
    setStateData,
    selectedCountry,
    setSelectedCountry,
    setSelectedState,
    billingAddress,
    shippingAddress,
    setUserData,
    deleteAddress,
    setUpEditForm,
    selectedState,
    makePrimaryAddress,
    cancellForm,
    Controller,
    control,
    zipCodeHandler,
    getCurrentCountryStateData,
    setValue,
  } = _Props;
  return (
    <>
      {activeTab.id === 1 && activeTab.addressType === 'T' && (
        <div>
          <h1 className='text-2xl-text mb-[20px] font-bold font-sub'>
            My Addresses
          </h1>
          <div className='mb-[40px] border-t border-t-gray-border'></div>
          <div className='flex flex-wrap gap-y-[15px]'>
            <div className='w-full'>
              <div className='mb-[30px]'>
                <div className='text-sub-text  mb-[10px] font-sub font-[600]'>
                  Billing Address
                </div>
                <div className='mt-[20px]'>
                  <div className='flex flex-wrap text-default-text'>
                    {billingAddress.length > 0 ? (
                      billingAddress.map((billAddressObj: _AddressObj) => (
                        <>
                          <div className='w-full lg:w-1/2 px-[15px] mb-[30px]'>
                            <div className='p-[15px] lg:p-[30px] shadow-md h-full bg-[#ffffff]'>
                              <div className='flex flex-wrap gap-x-[15px] mb-[15px] w-full'>
                                <div>Make Primary:</div>
                                <div className='flex items-center justify-end'>
                                  <div className='w-16 relative'>
                                    <input
                                      type='checkbox'
                                      id='switch-01'
                                      className='sr-only'
                                      x-model={billAddressObj.isDefault}
                                    />
                                    <label
                                      htmlFor='switch-01'
                                      className={`text-gray-500 lef text-center h-7 cursor-pointer flex items-center justify-center rounded leading-5 ${
                                        billAddressObj.isDefault
                                          ? 'bg-green-600'
                                          : 'bg-slate-600'
                                      }`}
                                      onClick={() =>
                                        makePrimaryAddress(
                                          billAddressObj,
                                          !billAddressObj.isDefault,
                                        )
                                      }
                                    >
                                      <span
                                        className={`bg-[#ffffff] shadow-sm w-6 h-6 transition-all absolute rounded left-0.5 ${
                                          billAddressObj.isDefault
                                            ? 'left-[38px]'
                                            : 'left-0.5'
                                        }`}
                                      ></span>
                                      <span
                                        className={`text-[#ffffff] text-xs inline-block absolute right-2 opacity-100 ${
                                          billAddressObj.isDefault
                                            ? 'opacity-0'
                                            : 'opacity-100'
                                        }`}
                                      >
                                        {billAddressObj.isDefault ? '' : 'No'}
                                      </span>
                                      <span
                                        className={`text-[#ffffff] text-xs inline-block absolute left-2 opacity-0 ${
                                          billAddressObj.isDefault
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        }`}
                                      >
                                        {billAddressObj.isDefault ? 'Yes' : ''}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className='text-medium-text mb-[10px]'>
                                {`${billAddressObj.firstname} ${billAddressObj.lastName}`}
                              </div>
                              <div className='text-small-text'>
                                {`${billAddressObj.address1}${
                                  billAddressObj.address2 &&
                                  ', ' + billAddressObj.address2
                                }`}
                                <br />
                                {`${billAddressObj.city + ', '} ${
                                  billAddressObj.state
                                }`}
                                <br />
                                {`${billAddressObj.postalCode}`} <br />
                                {`${billAddressObj.countryCode}`} <br />
                                {`${billAddressObj.phone}`}
                              </div>
                              <div className='flex justify-end gap-x-[15px]'>
                                <a
                                  className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                                  onClick={() => {
                                    setActiveTab({ id: 3, addressType: 'B' });
                                    setUpEditForm(billAddressObj);
                                  }}
                                >
                                  <span>
                                    <Image
                                      src={'/assets/images/icon-edit.svg'}
                                      isStatic
                                      alt={'editsIcon'}
                                      className={''}
                                    />
                                  </span>
                                  <button className='uppercase'>Edit</button>
                                </a>
                                <button
                                  className='text-anchor hover:text-anchor-text !flex flex-wrap items-center gap-x-[10px]'
                                  onClick={() =>
                                    deleteAddress(
                                      billAddressObj.id,
                                      billAddressObj.rowVersion,
                                      billAddressObj.isDefault,
                                    )
                                  }
                                >
                                  <span>
                                    <Image
                                      src={'/assets/images/delete-icon.png'}
                                      isStatic
                                      alt={'deleteIcon'}
                                      className={''}
                                    />
                                  </span>
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    ) : (
                      <div className='text-default-text mb-[10px]'>
                        There are no Billing Address available.
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    className='btn btn-md btn-primary'
                    onClick={() => setActiveTab({ id: 2, addressType: 'B' })}
                  >
                    ADD BILLING ADDRESS
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='border-b border-b-gray-border mb-[30px]'></div>
          <div className='flex flex-wrap gap-y-[15px]'>
            <div className='w-full'>
              <div className='mb-[30px]'>
                <div className='text-sub-text mb-[10px] font-sub font-[600]'>
                  Shipping Address
                </div>
                <div className='mt-[20px]'>
                  <div className='flex flex-wrap  text-default-text'>
                    {shippingAddress.length > 0 ? (
                      shippingAddress.map((shippingAddressObj: _AddressObj) => (
                        <>
                          <div className='w-full lg:w-1/2 px-[15px] mb-[30px]'>
                            <div className='p-[15px] lg:p-[30px] shadow-md h-full bg-[#ffffff]'>
                              <div className='flex flex-wrap gap-x-[15px] mb-[15px] w-full'>
                                <div>Make Primary:</div>
                                <div className='flex items-center justify-end'>
                                  <div className='w-16 relative'>
                                    <input
                                      type='checkbox'
                                      id='switch-01'
                                      className='sr-only'
                                      x-model={shippingAddressObj.isDefault}
                                    />
                                    <label
                                      htmlFor='switch-02'
                                      className={`text-gray-500 lef text-center h-7 cursor-pointer flex items-center justify-center rounded leading-5 ${
                                        shippingAddressObj.isDefault
                                          ? 'bg-green-600'
                                          : 'bg-slate-600'
                                      }`}
                                      onClick={() =>
                                        makePrimaryAddress(
                                          shippingAddressObj,
                                          !shippingAddressObj.isDefault,
                                        )
                                      }
                                    >
                                      <span
                                        className={`bg-[#ffffff] shadow-sm w-6 h-6 transition-all absolute rounded left-0.5 ${
                                          shippingAddressObj.isDefault
                                            ? 'left-[38px]'
                                            : 'left-0.5'
                                        }`}
                                      ></span>
                                      <span
                                        className={`text-[#ffffff] text-xs inline-block absolute right-2 opacity-100 ${
                                          shippingAddressObj.isDefault
                                            ? 'opacity-0'
                                            : 'opacity-100'
                                        }`}
                                      >
                                        {shippingAddressObj.isDefault
                                          ? ''
                                          : 'No'}
                                      </span>
                                      <span
                                        className={`text-[#ffffff] text-xs inline-block absolute left-2 opacity-0 ${
                                          shippingAddressObj.isDefault
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                        }`}
                                      >
                                        {shippingAddressObj.isDefault
                                          ? 'Yes'
                                          : ''}
                                      </span>
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className='text-medium-text mb-[10px]'>
                                {`${shippingAddressObj.firstname} ${shippingAddressObj.lastName}`}
                              </div>
                              <div className='text-small-text'>
                                {`${shippingAddressObj.address1}${
                                  shippingAddressObj.address2 &&
                                  ', ' + shippingAddressObj.address2
                                }`}
                                <br />
                                {`${shippingAddressObj.city + ', '} ${
                                  shippingAddressObj.state
                                }`}
                                <br />
                                {`${shippingAddressObj.postalCode}`} <br />
                                {`${shippingAddressObj.countryCode}`} <br />
                                {`${shippingAddressObj.phone}`}
                              </div>
                              <div className='flex justify-end gap-x-[15px]'>
                                <a
                                  className='btn btn-outline-primary btn-xs uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                                  onClick={() => {
                                    setActiveTab({ id: 3, addressType: 'S' });
                                    setUpEditForm(shippingAddressObj);
                                  }}
                                >
                                  <span>
                                    <Image
                                      src={'/assets/images/icon-edit.svg'}
                                      isStatic
                                      alt={'editsIcon'}
                                      className={''}
                                    />
                                  </span>
                                  <button className='uppercase'>Edit</button>
                                </a>
                                <button
                                  className='text-anchor hover:text-anchor-text !flex flex-wrap items-center gap-x-[10px]'
                                  onClick={() =>
                                    deleteAddress(
                                      shippingAddressObj.id,
                                      shippingAddressObj.rowVersion,
                                      shippingAddressObj.isDefault,
                                    )
                                  }
                                >
                                  <span>
                                    <Image
                                      src={'/assets/images/delete-icon.png'}
                                      isStatic
                                      alt={'deleteIcon'}
                                      className={''}
                                    />
                                  </span>
                                  <span>Delete</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                    ) : (
                      <div className='text-default-text mb-[10px]'>
                        There are no Shipping Address available.
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <button
                    className='btn btn-md btn-primary'
                    onClick={() => setActiveTab({ id: 2, addressType: 'S' })}
                  >
                    ADD SHIPPING ADDRESS
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {activeTab === 2 && (
        <div>
          <div className='text-2xl-text mb-[20px] font-bold font-sub'>
            Add New Address
          </div>
          <div className='mb-[40px] border-t border-t-gray-border'></div>
          <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px] panel-01 tab-content'>
            <div className='max-w-lg'>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  First Name
                  <span className='text-rose-600'> *</span>
                </label>
                <input
                  placeholder='Enter your first name'
                  className='form-input'
                />
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  Last Name
                  <span className='text-rose-600'> *</span>
                </label>
                <input
                  placeholder='Enter your last name'
                  className='form-input'
                />
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  Address 1<span className='text-rose-600'> *</span>
                </label>
                <input
                  placeholder='Enter your Block number,Apt Name etc.'
                  className='form-input'
                />
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  Address 2<span className='text-rose-600'> *</span>
                </label>
                <input
                  placeholder='Enter address line 2'
                  className='form-input'
                />
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  country
                  <span className='text-rose-600'> *</span>
                </label>
                <select
                  className='form-input'
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option>Select your Country</option>
                  {countryData?.map((country) => (
                    <option value={country.id}>{country.name}</option>
                  ))}
                </select>
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  Zip Code
                  <span className='text-rose-600'> *</span>
                </label>
                <input
                  placeholder='Enter your zip code'
                  className='form-input'
                />
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  City
                </label>
                <input placeholder='Enter your city' className='form-input' />
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  State / Province
                </label>
                <select className='form-input'>
                  <option>Select your state or province</option>
                  {stateData?.map((state) => (
                    <option value={state.name}>{state.name}</option>
                  ))}
                </select>
              </div>
              <div className='w-full mb-[20px]'>
                <label
                  htmlFor=''
                  className='block text-small-text mb-[5px] ml-[15px] font-bold uppercase'
                >
                  Contact Number
                  <span className='text-rose-600'> *</span>
                </label>
                <input
                  placeholder='Enter your contact number'
                  className='form-input'
                />
              </div>
              <div className='flex gap-x-[15px]'>
                <button
                  className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                  onClick={() => setActiveTab(1)}
                >
                  Save
                </button>
                <button
                  className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                  onClick={() => setActiveTab(1)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      {activeTab.id === 2 && (
        <div>
          <div className='text-2xl-text mb-[20px] font-bold font-sub'>
            {`Add ${
              activeTab.addressType === 'B' ? 'Billing' : 'Shipping'
            } Address`}
          </div>
          <div className='mb-[40px] border-t border-t-gray-border'></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px] panel-01 tab-content'>
              <div className='max-w-lg flex flex-col gap-4'>
                <Input
                  name='firstname'
                  label='First Name'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your first name'
                  error={errors?.firstname?.message}
                  type='text'
                />
                <Input
                  name='lastname'
                  label='Last Name'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your Last name'
                  error={errors?.lastname?.message}
                  type='text'
                />
                <Input
                  name='address1'
                  label='Address 1'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your Block number,Apt Name etc.'
                  error={errors?.address1?.message}
                  type='text'
                  max={35}
                />
                <Controller
                  name='address2'
                  control={control}
                  render={() => (
                    <Input
                      name='address2'
                      label='Address 2'
                      rootClassName=''
                      register={register}
                      placeholder='Enter address line 2'
                      error={errors?.address2?.message}
                      isRequired
                      type='text'
                      max={35}
                    />
                  )}
                />
                <label className='block text-small-text mb-[5px] font-bold uppercase'>
                  Zip Code
                  <span className='text-rose-600'>*</span>
                </label>
                <Controller
                  name='zipcode'
                  control={control}
                  render={() => (
                    <input
                      name='zipcode'
                      {...register('zipcode')}
                      className='form-input'
                      placeholder='Enter zip code'
                      error={errors?.zipcode?.message}
                      onBlur={(e: ChangeEvent<HTMLInputElement>) =>
                        zipCodeHandler(e.target.value)
                      }
                      type='text'
                    />
                  )}
                />{' '}
                {errors?.zipcode?.message && (
                  <p className='font-medium text-xs text-gray-darker'>
                    <div className='h-6 top-full left-0 text-red-500 text-[16px]'>
                      {errors?.zipcode?.message}
                    </div>
                  </p>
                )}
                <div className='w-full'>
                  <label
                    htmlFor='country'
                    className='block text-small-text mb-[7px] ml-[15px] font-bold uppercase'
                  >
                    Country
                    <span className='text-rose-600'> *</span>
                  </label>
                  <select
                    className='form-input'
                    name='country'
                    id='country'
                    {...register('country')}
                    onChange={(e) => {
                      setValue(
                        'countryCode',
                        e.target.selectedOptions[0].getAttribute('data-key') ??
                          '',
                      );
                      getCurrentCountryStateData(
                        +e.target.options[e.target.selectedIndex].id,
                      );
                    }}
                  >
                    <option>Select your Country</option>
                    {countryData?.map((country) => (
                      <Fragment key={country.id}>
                        <option
                          value={country.name}
                          id={`${country.id}`}
                          data-key={`${country.countryCode}`}
                        >
                          {country.name}
                        </option>
                      </Fragment>
                    ))}
                  </select>
                  {errors?.country && (
                    <div>
                      <span className='font-medium text-red-500 text-[17px]'>
                        {errors?.country.message}
                      </span>
                    </div>
                  )}
                </div>
                <Input
                  name='city'
                  label='City'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your city'
                  error={errors?.city?.message}
                  type='text'
                />
                <div className='w-full'>
                  <label
                    htmlFor='state'
                    className='block text-small-text mb-[7px] ml-[15px] font-bold uppercase'
                  >
                    State / Province
                  </label>
                  <select
                    id='state'
                    {...register('state')}
                    name='state'
                    className='form-input'
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                    }}
                  >
                    <option value={''}>Select your state or province</option>
                    {stateData?.map((state) => (
                      <option value={state.name} key={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors?.state && (
                    <div>
                      <span className='font-medium text-red-500 text-[17px]'>
                        {errors?.state.message}
                      </span>
                    </div>
                  )}
                </div>
                <Input
                  name='contactnumber'
                  label='Contact Number'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your contact number'
                  error={errors?.contactnumber?.message}
                  type='text'
                />
                <div className='flex gap-x-[15px]'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                  >
                    Save
                  </button>
                  <button
                    className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                    onClick={() => cancellForm()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {activeTab.id === 3 && (
        <div>
          <div className='text-2xl-text mb-[20px] font-bold font-sub'>
            {`Edit ${
              activeTab.addressType === 'B' ? 'Billing' : 'Shipping'
            } Address`}
          </div>
          <div className='mb-[40px] border-t border-t-gray-border'></div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='p-[15px] lg:p-[30px] drop-shadow-md rounded-sm bg-[#ffffff] mb-[40px] panel-01 tab-content'>
              <div className='max-w-lg flex flex-col gap-4'>
                <Input
                  name='firstname'
                  label='First Name'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your first name'
                  error={errors?.firstname?.message}
                  type='text'
                />
                <Input
                  name='lastname'
                  label='Last Name'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your Last name'
                  error={errors?.lastname?.message}
                  type='text'
                />
                <Input
                  name='address1'
                  label='Address 1'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your Block number, Apt Name etc.'
                  error={errors?.address1?.message}
                  type='text'
                />
                <Input
                  name='address2'
                  label='Address 2'
                  rootClassName=''
                  register={register}
                  placeholder='Enter address line 2'
                  error={errors?.address2?.message}
                  type='text'
                  isRequired
                />

                <div className='w-full pt-3 mt-1 flex flex-col gap-1 relative'>
                  <label className='block text-small-text mb-[5px] font-bold uppercase'>
                    Zip Code
                    <span className='text-rose-600'>*</span>
                  </label>
                  <Controller
                    name='zipcode'
                    control={control}
                    render={() => (
                      <input
                        name='zipcode'
                        // onChange={onChange}
                        className='form-input'
                        {...register('zipcode')}
                        onBlur={(e) => zipCodeHandler(e.target.value)}
                        placeholder='Enter your zip code'
                        error={errors?.zipcode?.message}
                        type='text'
                      />
                    )}
                  />
                </div>
                <div className='w-full'>
                  <label
                    htmlFor='country'
                    className='block text-small-text mb-[7px] ml-[15px] font-bold uppercase'
                  >
                    Country
                    <span className='text-rose-600'> *</span>
                  </label>
                  <select
                    className='form-input'
                    name='country'
                    id='country'
                    {...register('country')}
                    onChange={(e) => {
                      getCurrentCountryStateData(
                        +e.target.options[e.target.selectedIndex].id,
                      );
                    }}
                    // value={activeTab.id === 3 ? selectedCountry.name : ''}
                  >
                    <option>Select your Country</option>
                    {countryData?.map((country) => {
                      return (
                        <Fragment key={country.id}>
                          <option value={country.name} id={`${country.id}`}>
                            {country.name}
                          </option>
                        </Fragment>
                      );
                    })}
                  </select>
                  {errors?.country && (
                    <div>
                      <span className='font-medium text-red-500 text-[17px]'>
                        {errors?.country.message}
                      </span>
                    </div>
                  )}
                </div>

                <Input
                  name='city'
                  label='City'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your city'
                  error={errors?.city?.message}
                  type='text'
                />
                <div className='w-full'>
                  <label
                    htmlFor='state'
                    className='block text-small-text mb-[7px] ml-[15px] font-bold uppercase'
                  >
                    State / Province
                  </label>
                  <select
                    id='state'
                    name='state'
                    {...register('state')}
                    className='form-input'
                    onChange={(e) => {}}
                    // value={activeTab.id === 3 ? selectedState : ''}
                  >
                    <option value={''}>Select your state or province</option>
                    {stateData?.map((state) => (
                      <option key={state?.id} value={state?.name}>
                        {state?.name}
                      </option>
                    ))}
                  </select>
                  {errors?.state && (
                    <div>
                      <span className='font-medium text-red-500 text-[17px]'>
                        {errors?.state.message}
                      </span>
                    </div>
                  )}
                </div>
                <Input
                  name='contactnumber'
                  label='Contact Number'
                  rootClassName=''
                  register={register}
                  placeholder='Enter your contact number'
                  error={errors?.contactnumber?.message}
                  type='text'
                />
                <div className='flex gap-x-[15px]'>
                  <button
                    type='submit'
                    className='btn btn-primary btn-sm uppercase !font-body !rounded-xs'
                  >
                    Save
                  </button>
                  <button
                    className='btn btn-outline-primary btn-sm uppercase !font-body !rounded-xs !inline-flex gap-[10px] items-center'
                    onClick={() => cancellForm()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default MyAddress;
