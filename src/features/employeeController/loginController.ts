'use client';
import React, { ReactElement, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

import {
  TEMPUSER_ID,
  USER_DETAILS,
  USER_ID,
  getStoreId,
  getTempUserId,
} from '@/shared/utils/cookie.helper';

import { showLoader } from '@/app/redux/slices/commonSlice';
import {
  setLoginUserDetails,
  setLoginUserId,
  setWishlistData,
} from '@/app/redux/slices/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteCookie, setCookie } from 'cookies-next';
import {
  Control,
  Controller,
  ControllerProps,
  FieldErrors,
  FieldPath,
  FieldValues,
  UseFormHandleSubmit,
  useForm,
} from 'react-hook-form';

import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { updateCartByNewUserId } from '@/shared/apis/cart/transferCart';
import { checkCustomerAlreadyExist } from '@/shared/apis/checkout/customerExistsOrNot';
import { getAppConfig } from '@/shared/apis/common/common';
import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import EmployeeController from './controller';

interface _CheckoutAddressReadyProps {
  Controller: <
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    props: ControllerProps<TFieldValues, TName>,
  ) => import('react').ReactElement<
    any,
    string | import('react').JSXElementConstructor<any>
  >;
  emailOnSubmit: () => void;
  emailControl: Control<guestCheckoutEmail>;
  emailErrors: FieldErrors<guestCheckoutEmail>;
  emailSubmitHandle: UseFormHandleSubmit<guestCheckoutEmail, undefined>;
  emailTouchedFields: Partial<Readonly<EmailTouchedFields>>;
}

interface EmailTouchedFields {
  email: boolean;
}

interface MobileTouchedFields {
  mobile: boolean;
}

interface _Props {
  cases: {
    ready: (props: _CheckoutAddressReadyProps) => ReactElement<any, any>;
  };
}

interface guestCheckoutEmail {
  email?: string;
  mobile?: string;
}

const EmployeeLoginScreenController: React.FC<_Props> = ({ cases }) => {
  EmployeeController();
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [emailSuffix, setEmailSuffix] = useState<string>('');

  const storeId = getStoreId();

  const appConfigName = 'DomainConcateEmail';

  const fetchAppConfig = async () => {
    const response = await getAppConfig(storeId, appConfigName);
    if (response?.domainConcateEmail) {
      setEmailSuffix(response?.domainConcateEmail);
    }
  };

  useEffect(() => {
    fetchAppConfig();
  }, []);

  const schema = Yup.object().shape({
    email: Yup.string().email('Email is not valid'),
    mobile: Yup.string().test({
      name: 'is-valid-mobile',
      message: 'Invalid mobile number',
      test: function (value) {
        return !value || (value.trim() !== '' && /^\d{10}$/.test(value));
      },
    }),
  });

  const tempId = getTempUserId();

  const {
    getValues: emailValue,
    handleSubmit: emailSubmitHandle,
    control: emailControl,
    formState: { errors: emailErrors, touchedFields: emailTouchedFields },
  } = useForm<guestCheckoutEmail>({
    resolver: yupResolver(schema),
  });

  const handleError = (errorResponse: any) => {
    let error = {
      title: '',
      message: '',
    };

    Object.keys(errorResponse).forEach((key, index) => {
      if (index === 0) {
        error.title = 'Failed' || 'Something went wrong!!';
        error.message = errorResponse[key] || 'Try again, later!!!';
      }
    });

    dispatch(
      openAlertModal({
        title: 'Error',
        description: error.message,
        isAlertModalOpen: true,
      }),
    );
  };

  const emailOnSubmit = async () => {
    const emailInputValue: string = emailValue().email || '';
    const mobileInputValue: string = emailValue().mobile || '';
    if (emailInputValue) {
      setEmail(emailInputValue);
    } else if (mobileInputValue) {
      setEmail(mobileInputValue + emailSuffix);
    }

    dispatch(showLoader(true));

    let emailTemp =
      emailValue().mobile && !emailInputValue
        ? mobileInputValue + emailSuffix
        : emailInputValue;

    try {
      const response = await checkCustomerAlreadyExist(emailTemp, storeId);

      if (response.isCustomerExist) {
        await skipUserPasswordScreen(response.id);
        return;
      }

      if (!response.isCustomerExist) {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: `User doesn't exist`,
            isAlertModalOpen: true,
          }),
        );
        dispatch(showLoader(false));
      }
    } catch (err) {
      dispatch(showLoader(false));
      handleError(err);
    }
  };

  const skipUserPasswordScreen = async (registeredUserId: number) => {
    setCookie(USER_ID, JSON.stringify(Number(registeredUserId)));
    dispatch(setLoginUserId(Number(registeredUserId)));
    dispatch(showLoader(true));

    await Promise.allSettled([
      getUserDetailsById(registeredUserId),
      updateCartByNewUserId(~~tempId, registeredUserId),
      getWishlist(registeredUserId),
    ])
      .then((values) => {
        const userDetails =
          values[0].status === 'fulfilled' ? values[0].value : null;

        const wishlistData =
          values[2].status === 'fulfilled' ? values[2].value : null;

        if (userDetails) {
          const configuredUSerData = {
            firstName: userDetails.firstname,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password,
            isRegistered: userDetails.isRegistered,
          };
          dispatch(setLoginUserDetails(configuredUSerData));
          setCookie(USER_DETAILS, JSON.stringify(configuredUSerData));
        }

        deleteCookie(TEMPUSER_ID);

        if (wishlistData) {
          dispatch(setWishlistData(wishlistData));
        }
        dispatch(showLoader(false));

        router.push(paths.home);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        dispatch(showLoader(false));
      });
  };

  return cases.ready({
    Controller,
    emailOnSubmit,
    emailControl,
    emailErrors,
    emailSubmitHandle,
    emailTouchedFields,
  });
};

export default EmployeeLoginScreenController;
