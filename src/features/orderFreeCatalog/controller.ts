'use client';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import {
  FetchCountriesList,
  _Country,
} from '@/shared/apis/checkout/fetchCountriesList';
import { FetchStatesList, _State } from '@/shared/apis/checkout/fetchStateList';
import {
  _ContactUs,
  postContactUsData,
} from '@/shared/apis/contactUs/contactUs';
import storeDetails from '@/staticData/storeDetails.json';
import { paths } from '@/utils/paths.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

interface _Props {
  configs: null;
  cases: {
    ready: (helper: _Helpers) => ReactElement<any, any>;
  };
}
export interface _Helpers {
  stateData: _State[];
  getCurrentCountryStateData: (countryId: number) => void;
  countryData: _Country[];
  register: UseFormRegister<_Values>;
  hookForm: {
    errors: FieldErrors<_Values>;
    handleSubmit: UseFormHandleSubmit<_Values, any>;
  };
  onSubmit: (values: _Values) => void;
  verifiedCaptcha: 'VALID' | 'NOT_VALID' | null;
  verifyCaptcha: () => void;
}
export interface _Values {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail?: string;
  street: string;
  city: string;
  country: string;
  state: string;
  zip: string;
  comment?: string;
}

const OrderFreeCatalogController: React.FC<_Props> = (_Props) => {
  const { cases } = _Props;
  const [status, setStatus] = useState<'ready'>('ready');
  const [countryData, setCountryData] = useState<_Country[]>([]);
  const [stateData, setStateData] = useState<_State[]>([]);
  const [verifiedCaptcha, setVerifiedCaptcha] = useState<
    'VALID' | 'NOT_VALID' | null
  >(null);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const getCountryData = async () => {
    const country = await FetchCountriesList();
    country && setCountryData(country);
  };

  const getCurrentCountryStateData = async (countryId: number) => {
    const state = await FetchStatesList(countryId);
    state && setStateData(state);
  };

  const schema = yup.object({
    firstName: yup.string().required().label('First name'),
    lastName: yup.string().required().label('Last name'),
    email: yup.string().email().required().label('Email'),
    confirmEmail: yup.string().oneOf([yup.ref('email')], 'Email must match'),
    street: yup.string().required().label('Street'),
    city: yup.string().required().label('City'),
    country: yup.string().required().label('Country'),
    state: yup.string().required().label('State'),
    zip: yup.string().required().label('Zip'),
    comment: yup.string(),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<_Values>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirmEmail: '',
      street: '',
      city: '',
      country: '',
      state: '',
      zip: '',
      comment: '',
    },
  });

  const onSubmit = async (value: _Values) => {
    dispatch(showLoader(true));
    try {
      const payload: _ContactUs = {
        contactUsModel: {
          rowVersion: '',
          location: '',
          ipAddress: storeDetails.ipAddress,
          macAddress: storeDetails.macAddress,
          id: 0,
          name: `${value.firstName} ${value.lastName}`,
          email: value.email,
          subject: '',
          address: value.street,
          city: value.city,
          county: value.country,
          state: value.state,
          zipCode: value.zip,
          phone: '',
          comment: value.comment,
          storeId: storeDetails.storeId,
          recStatus: '',
          companyName: storeDetails.name,
          isReferral: true,
        },
      };
      await postContactUsData(payload);
      navigate.push(paths.thank_you);
    } catch (error: any) {
      dispatch(
        openAlertModal({
          title: '',
          description: 'Details not submitted',
          isAlertModalOpen: true,
        }),
      );
      console.log(error.message || 'Something wrong inside contact us');
    } finally {
      dispatch(showLoader(false));
    }
  };

  const verifyCaptcha = () => {
    setVerifiedCaptcha('VALID');
  };

  useEffect(() => {
    getCountryData();
  }, []);

  if (status === 'ready') {
    return cases.ready({
      stateData,
      getCurrentCountryStateData,
      countryData,
      register,
      hookForm: { errors, handleSubmit },
      onSubmit,
      verifiedCaptcha,
      verifyCaptcha,
    });
  }
  return null;
};

export default OrderFreeCatalogController;
