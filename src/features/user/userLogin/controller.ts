'use client';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { checkoutActions } from '@/app/redux/slices/checkoutSlice';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import {
  setLoginUserDetails,
  setLoginUserId,
  setWishlistData,
} from '@/app/redux/slices/userSlice';
import { getCartDetails } from '@/shared/apis/cart/fetchCartProducts';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { updateCartByNewUserId } from '@/shared/apis/cart/transferCart';
import { FetchCustomerStoreCredits } from '@/shared/apis/storeCredits/fetchCustomerCredit';
import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import { userLogin } from '@/shared/apis/user/userLogin';
import {
  TEMPUSER_ID,
  USER_DETAILS,
  USER_ID,
  getTempUserId,
} from '@/shared/utils/cookie.helper';
import storeDetails from '@/staticData/storeDetails.json';
import { paths } from '@/utils/paths.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { deleteCookie, setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { _LoginConfig } from './config';
interface _LoginHelpers {
  hookForm: any;
  errorMessage: null | string;
  onSubmit: any;
  setErrorMessage: Function;
  config: _LoginConfig;
  prevRoute: any;
  Controller: any;
  control: any;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  // onChange: any;
}

type _Props = {
  config: _LoginConfig;
  cases: {
    view: (helpers: _LoginHelpers) => ReactElement<any, any>;
  };
};

const schema = yup.object({
  userName: yup.string().email().required().label('User Name'),
  password: yup.string().required().label('Password'),
});

const LoginModelController: React.FC<_Props> = ({ cases, config }) => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const { update_PaymentDetails } = checkoutActions;
  const prevRoute = searchParams.get('redirect');
  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: { userName: '', password: '' },
  });

  const tempId = getTempUserId();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = hookForm;

  // const onChange = () => {
  //   setErrorMessage(null);
  // };

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

  const onSubmit = async (values: { password: string; userName: string }) => {
    try {
      dispatch(showLoader(true));
      const apiPayload = {
        ...values,
        storeId: storeDetails.storeId,
      };

      const userLoginData: number = await userLogin(apiPayload);
      setCookie(USER_ID, JSON.stringify(Number(userLoginData)));
      dispatch(setLoginUserId(Number(userLoginData)));

      if (tempId) {
        const transfer = await updateCartByNewUserId(~~tempId, userLoginData);
        if (transfer) {
          const cartDetails = await getCartDetails(userLoginData, false);
          dispatch(addCartData(cartDetails));
        }
        deleteCookie(TEMPUSER_ID);
      }

      const userDetails = await getUserDetailsById(userLoginData);
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

      let payload = {
        storeId: storeDetails.storeId,
        customerId: userLoginData,
      };
      const creditRes = await FetchCustomerStoreCredits(payload);
      if (creditRes) {
        dispatch(
          update_PaymentDetails({
            method: 'SAVE_CREDITS',
            value: {
              giftCardWalletBalance: creditRes.giftCardWalletBalance,
              storeCredits: creditRes.storeCreditRefundBalance,
            },
          }),
        );
      }

      const wishlistData = await getWishlist(+userLoginData);
      if (wishlistData) {
        dispatch(setWishlistData(wishlistData));
      }

      router.push(
        prevRoute || prevRoute == paths.signUp
          ? prevRoute
          : paths.accountSetting,
      );
    } catch (err) {
      handleError(err);
    } finally {
      dispatch(showLoader(false));
    }
  };

  return cases.view({
    hookForm: { register, errors, handleSubmit },
    errorMessage,
    onSubmit,
    setErrorMessage,
    config,
    prevRoute,
    Controller,
    control,
    showPassword,
    setShowPassword,
  });
};

export default LoginModelController;
