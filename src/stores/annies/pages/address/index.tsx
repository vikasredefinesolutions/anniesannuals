'use client';
import AddressController from '@/features/myAccount/address/controller';
import Loader from '@/shared/Components/Loader';
import { getUserId } from '@/shared/utils/cookie.helper';
import { useRouter } from 'next/navigation';
import React from 'react';
import SideLayout from '../../shared/components/myAccountLayout';
import MyAddress from './components/myAddress';

const Address: React.FC = () => {
  const userId = getUserId();
  const router = useRouter();

  if (!userId) {
    router.push('sign-in.html');
    return;
  }

  return (
    <>
      <AddressController
        configs={null}
        cases={{
          loading: () => <Loader />,
          empty: () => <Loader />,
          ready: ({
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
          }) => (
            <>
              <SideLayout checkAccount={true}>
                <MyAddress
                  onSubmit={onSubmit}
                  hookForm={{ errors, register, handleSubmit }}
                  billingAddressPrimary={billingAddressPrimary}
                  setBillingAddressPrimary={setBillingAddressPrimary}
                  shippingAddressPrimary={shippingAddressPrimary}
                  setShippingAddressPrimary={setShippingAddressPrimary}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  countryData={countryData}
                  stateData={stateData}
                  setStateData={setStateData}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  setSelectedState={setSelectedState}
                  billingAddress={billingAddress}
                  shippingAddress={shippingAddress}
                  setUserData={setUserData}
                  deleteAddress={deleteAddress}
                  setUpEditForm={setUpEditForm}
                  selectedState={selectedState}
                  makePrimaryAddress={makePrimaryAddress}
                  cancellForm={cancellForm}
                  Controller={Controller}
                  control={control}
                  zipCodeHandler={zipCodeHandler}
                  getCurrentCountryStateData={getCurrentCountryStateData}
                  setValue={setValue}
                />
              </SideLayout>
            </>
          ),
        }}
      />
    </>
  );
};

export default Address;
