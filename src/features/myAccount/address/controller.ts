'use client';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { CreateUserAddress } from '@/shared/apis/checkout/createAddress';
import {
  FetchCountriesList,
  _Country,
} from '@/shared/apis/checkout/fetchCountriesList';
import { FetchStatesList, _State } from '@/shared/apis/checkout/fetchStateList';
import { getLocationWithZipCode } from '@/shared/apis/checkout/getLocationWithZipCode';
import {
  AddressAPIRequest,
  UpdateUserAddress,
} from '@/shared/apis/checkout/updateAddress';
import { deleteUserAddress } from '@/shared/apis/user/deleteUserAddress';
import {
  _AddressObj,
  getUserDetailsById,
} from '@/shared/apis/user/fetchUserDetails';
import { udpateIsDefaultAddress } from '@/shared/apis/user/updateAddressPrimaryStatus';
import { getUserId } from '@/shared/utils/cookie.helper';
import {
  __ValidationText,
  getLocation,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: _Helper) => ReactElement<any, any>;
  };
}

interface _Helper {
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

export interface _ActiveTabs {
  id: number;
  addressType: 'T' | 'S' | 'B';
}

const AddressController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [billingAddressPrimary, setBillingAddressPrimary] =
    useState<boolean>(false);
  const [shippingAddressPrimary, setShippingAddressPrimary] =
    useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<_ActiveTabs>({
    id: 1,
    addressType: 'T',
  });
  const [userData, setUserData] = useState<any>();

  const [countryData, setCountryData] = useState<any>();
  const [stateData, setStateData] = useState<any>();
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    code: string;
    id: string;
  }>({ name: '', code: '', id: '' });
  const [selectedState, setSelectedState] = useState<string>('');
  const [billingAddress, setBillingAddress] = useState<_AddressObj[]>([]);
  const [shippingAddress, setShippingAddress] = useState<_AddressObj[]>([]);
  const [selectedAddressIdRowVersion, setSelectedAddressIdRowVersion] =
    useState<{ id: number; rowVersion: string; isDefaultStatus: boolean }>({
      id: 0,
      rowVersion: '',
      isDefaultStatus: false,
    });
  const userId = getUserId();
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = yup.object({
    firstname: yup.string().required().label('First Name'),
    lastname: yup.string().required().label('Last Name'),
    address1: yup.string().required().label('Address'),
    address2: yup.string().label('Address'),
    zipcode: yup.string().required().label('Zip Code'),
    city: yup.string().required().label('City'),
    country: yup.string().required().label('Country'),
    countryCode: yup.string().label('Country code'),
    state: yup.string().required().label('State'),
    contactnumber: yup
      .string()
      .trim()
      .required(__ValidationText.phone.required)
      .test('phone-test', __ValidationText.phone.valid, (value) => {
        if (
          phonePattern1.test(value || '') ||
          phonePattern2.test(value || '') ||
          phonePattern3.test(value || '') ||
          phonePattern4.test(value || '')
        ) {
          return true;
        }
        return false;
      }),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      address1: '',
      address2: '',
      zipcode: '',
      city: '',
      country: 'United States',
      countryCode: 'US',
      state: '',
      contactnumber: '',
    },
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
    clearErrors,
    setValue,
  } = hookForm;

  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  useEffect(() => {
    setAddress();
  }, [userData]);

  useEffect(() => {
    setValue('state', selectedState);
  }, [stateData]);

  const checkIfUserLoggedIn = async () => {
    if (!userId) {
      router.push(paths.login);
    } else {
      setStatus('loading');
      await getCountryData();
      await getCurrentCountryStateData(1);
      await getUserData();
      await setAddress();
      setStatus('ready');
    }
  };

  const getUserData = async () => {
    let user = await getUserDetailsById(userId);
    setUserData(user);
  };

  const setAddress = () => {
    let shippingAdd: _AddressObj[] = [];
    let billingAdd: _AddressObj[] = [];

    userData?.customerAddress.map((customerObj: any) => {
      customerObj.addressType === 'B'
        ? billingAdd.push(customerObj)
        : shippingAdd.push(customerObj);
    });
    setBillingAddress(billingAdd);
    setShippingAddress(shippingAdd);
  };

  const zipCodeHandler = async (zipCode: string) => {
    const locationData = await getLocationWithZipCode(zipCode);
    const countryCode = countryData.find(
      (elem: any) => elem?.name === locationData?.countryName,
    )?.countryCode;

    if (locationData?.countryId) {
      getCurrentCountryStateData(locationData.countryId).then(() => {
        setValue('country', locationData.countryName);
        setSelectedState(locationData.stateName);
        setValue('city', locationData.cityName);
        clearErrors(['city', 'country', 'state']);
      });
    }
  };

  const deleteAddress = async (
    addressId: number,
    rowVersion: string,
    isDefault: boolean,
  ) => {
    if (isDefault) {
      dispatch(
        openAlertModal({
          title: '',
          description: 'Cannot delete primary address',
          isAlertModalOpen: true,
        }),
      );
      return;
    } else {
      await deleteUserAddress(addressId, rowVersion);
      await getUserData();
    }
  };

  const checkIsDefault = () => {
    return activeTab.id == 3
      ? selectedAddressIdRowVersion.isDefaultStatus
      : activeTab.addressType == 'B'
      ? billingAddress.length == 0
        ? true
        : false
      : shippingAddress.length == 0
      ? true
      : false;
  };

  const makePrimaryAddress = async (
    addressObject: _AddressObj,
    addressStatus: boolean,
  ) => {
    try {
      if (!addressStatus) {
        dispatch(
          openAlertModal({
            title: '',
            description: 'Already primary cannot change the status',
            isAlertModalOpen: true,
          }),
        );

        return;
      } else {
        let payload = {
          isDefault: addressStatus,
          addressId: addressObject.id,
          customerId: userId,
          addressType: addressObject.addressType,
        };

        await udpateIsDefaultAddress(payload);
        await getUserData();

        return;
      }
    } catch (error) {
      console.log(error, '<---error encountered');
    }
  };

  const onSubmit = async (values: any) => {
    try {
      const location = getLocation();
      const isExist = userData?.customerAddress?.find(
        (e: any) =>
          e.address1 === values.address1 &&
          e.city === values.city &&
          e.state === values.state &&
          e.postalCode === values.zipcode,
      );
      console.log(values, isExist, 'isExist', userData?.customerAddress);

      if (isExist?.firstname) {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: 'This address already exists.',
            isAlertModalOpen: true,
          }),
        );
        reset({
          firstname: '',
          lastname: '',
          address1: '',
          address2: '',
          zipcode: '',
          country: 'United States',
          countryCode: 'US',
          state: '',
          city: '',
          contactnumber: '',
        });
      } else {
        let payload: AddressAPIRequest = {
          storeCustomerAddressModel: {
            customerId: userId,
            firstname: values.firstname,
            lastName: values.lastname,
            companyName: userData.companyName || '',
            email: userData.email,
            address1: values.address1,
            address2: values.address2,
            suite: '',
            city: values.city,
            state: values.state,
            postalCode: values.zipcode,
            phone: values.contactnumber,
            fax: '',
            countryName: values.country,
            countryCode: values.countryCode,
            addressType: activeTab.addressType,
            isDefault: checkIsDefault(),
            recStatus: 'A',
            id: activeTab.id === 3 ? selectedAddressIdRowVersion.id : 0,
            rowVersion:
              activeTab.id === 3
                ? `${selectedAddressIdRowVersion.rowVersion}`
                : '',
            location: `${location.city}, ${location.region}, ${location.country}, ${location.postal_code}`,
            ipAddress: '192.168.1.1',
            macAddress: '',
          },
        };
        if (activeTab.id === 3) {
          console.log(payload, '<---payload');

          const addressUpdated = await UpdateUserAddress(payload);
          setSelectedAddressIdRowVersion({
            id: 0,
            rowVersion: '',
            isDefaultStatus: false,
          });
        } else {
          const addressCreated = await CreateUserAddress(payload);
        }
      }
    } catch (error) {
      console.log(error, '<-----Error Occured');
    } finally {
      await getUserData();
      reset({
        firstname: '',
        lastname: '',
        address1: '',
        address2: '',
        zipcode: '',
        country: 'United States',
        countryCode: 'US',
        state: '',
        city: '',
        contactnumber: '',
      });
      setSelectedState('');
      setActiveTab({
        id: 1,
        addressType: 'T',
      });
    }
  };

  const getCountryData = async () => {
    const country = await FetchCountriesList();
    setCountryData(country);
  };

  const getCurrentCountryStateData = async (countryId: number) => {
    const state = await FetchStatesList(countryId);
    setStateData(state);
    setSelectedState('');
  };

  const setUpEditForm = (formObj: _AddressObj) => {
    setSelectedAddressIdRowVersion({
      id: formObj.id,
      rowVersion: formObj.rowVersion,
      isDefaultStatus: formObj.isDefault,
    });

    const formCountry = countryData.find(
      (country: any) => country.countryCode === formObj.countryCode,
    );

    reset({
      firstname: formObj.firstname,
      lastname: formObj.lastName,
      address1: formObj.address1,
      address2: formObj.address2,
      zipcode: formObj.postalCode,
      country: formObj.countryName,
      city: formObj.city,
      contactnumber: formObj.phone,
      countryCode: formObj.countryCode,
      state: formObj.state,
    });

    // setSelectedCountry({
    //   name: formCountry.name,
    //   code: formCountry.countryCode,
    //   id: formCountry.id,
    // });
    // setSelectedState(formObj.state);
  };

  const cancellForm = () => {
    setActiveTab({ id: 1, addressType: 'T' });
    reset({
      firstname: '',
      lastname: '',
      address1: '',
      address2: '',
      zipcode: '',
      country: 'United States',
      countryCode: 'US',
      state: '',
      city: '',
      contactnumber: '',
    });
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
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
    });
  }
  return null;
};

export default AddressController;
