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
import { passwordAtLeastRegex, passwordRegExp, passwordSpecialCharacterRegex, passwordUpperCaseRegex } from '@/utils/helpers';
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

import { useAppSelector } from '@/app/redux/hooks';
import { addCartData } from '@/app/redux/slices/cartSlice';
import { checkoutActions } from '@/app/redux/slices/checkoutSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { getCartDetails } from '@/shared/apis/cart/fetchCartProducts';
import { getWishlist } from '@/shared/apis/cart/getWishlistItems';
import { updateCartByNewUserId } from '@/shared/apis/cart/transferCart';
import { createGuestAccount } from '@/shared/apis/checkout/createGuestAccount';
import { checkCustomerAlreadyExist } from '@/shared/apis/checkout/customerExistsOrNot';
import { getAppConfig } from '@/shared/apis/common/common';
import { FetchCustomerStoreCredits } from '@/shared/apis/storeCredits/fetchCustomerCredit';
import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import { userLogin } from '@/shared/apis/user/userLogin';

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
  creatAccountOnSubmit: () => void;
  passwordOnSubmit: () => void;
  emailControl: Control<guestCheckoutEmail>;
  passwordControl: Control<guestCheckoutPassword>;
  guestAccountControl: Control<guestCheckoutCreateAccount>;
  guestAccountErrors: FieldErrors<guestCheckoutCreateAccount>;
  passwordErrors: FieldErrors<guestCheckoutPassword>;
  emailErrors: FieldErrors<guestCheckoutEmail>;
  guestAccountSubmitHandle: UseFormHandleSubmit<
    guestCheckoutCreateAccount,
    undefined
  >;
  passowordSubmitHandle: UseFormHandleSubmit<guestCheckoutPassword, undefined>;
  emailSubmitHandle: UseFormHandleSubmit<guestCheckoutEmail, undefined>;
  emailTouchedFields: Partial<Readonly<EmailTouchedFields>>;
  passwordTouchedFields: Partial<Readonly<PasswordTouchedFields>>;
  guuestAccountTouchedFields: Partial<Readonly<GuestAccountTouchedFields>>;
  continueAsGuest: () => void;
  passwordVisbility: boolean;
  confirmPasswordVisbility: boolean;
  changeConfirmPasswordVisibility: () => void;
  changePasswordVisibility: () => void;
  isEmployeeLoggedIn: boolean;
  passwordParameter: IPasswordParam;
}

interface IPasswordParam {
  lengthCheck: boolean;
  upperCaseLetterCheck: boolean;
  numberCheck: boolean;
  specialCharacterCheck: boolean;
}

interface EmailTouchedFields {
  email: boolean;
}

interface MobileTouchedFields {
  mobile: boolean;
}

interface PasswordTouchedFields {
  password: boolean;
}

interface GuestAccountTouchedFields {
  password: boolean;
  confirmPassword: boolean;
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

interface guestCheckoutMobile {
  mobile?: string;
}

interface guestCheckoutPassword {
  password: string;
}

interface guestCheckoutCreateAccount {
  password: string;
  confirmPassword: string;
}

const GuestCheckoutController: React.FC<_Props> = ({ cases }) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');
  const [emailSuffix, setEmailSuffix] = useState<string>('');
  const [passwordVisbility, setPasswordVisibility] = useState<boolean>(false);
  const [confirmPasswordVisbility, setconfirmPasswordVisbility] =
    useState<boolean>(false);

  const [passwordParameter, setPasswordParameter] = useState<IPasswordParam>({
    lengthCheck: false,
    upperCaseLetterCheck: false,
    numberCheck: false,
    specialCharacterCheck: false,
  });

  const storeId = getStoreId();
  const { update_GuestUserInformation, update_PaymentDetails } =
    checkoutActions;
  const appConfigName = 'DomainConcateEmail';

  const { loggedIn: isEmployeeLoggedIn } = useAppSelector(
    (state) => state.employee,
  );

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

  const PasswordSchema = Yup.object({
    password: Yup.string()
      .trim()
      .required('Password is required'),
  });

  const CreateAccountPasswordSchema = Yup.object({
    password: Yup.string()
      .trim()
      .required('Password must match the below criteria')
      .matches(
        passwordRegExp,
        'Password must match the below criteria',
      ),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const tempId = getTempUserId();

  const changeConfirmPasswordVisibility = () => {
    setconfirmPasswordVisbility((prev) => !prev);
  };

  const changePasswordVisibility = () => {
    setPasswordVisibility((prev) => !prev);
  };
  const {
    getValues: emailValue,
    handleSubmit: emailSubmitHandle,
    control: emailControl,
    formState: { errors: emailErrors, touchedFields: emailTouchedFields },
  } = useForm<guestCheckoutEmail>({
    resolver: yupResolver(schema),
  });

  const {
    getValues: passwordValue,
    handleSubmit: passowordSubmitHandle,
    control: passwordControl,
    formState: { errors: passwordErrors, touchedFields: passwordTouchedFields, }
  } = useForm<guestCheckoutPassword>({
    resolver: yupResolver(PasswordSchema),
  });
  const {
    getValues: guestAccountValues,
    handleSubmit: guestAccountSubmitHandle,
    control: guestAccountControl,
    formState: {
      errors: guestAccountErrors,
      touchedFields: guuestAccountTouchedFields,
    },
    watch,
  } = useForm<guestCheckoutCreateAccount>({
    resolver: yupResolver(CreateAccountPasswordSchema),
  });

  useEffect(() => {
    const password = guestAccountValues('password');
    setPasswordParameter((prevPasswordParameter) => ({
      ...prevPasswordParameter,
      numberCheck: passwordAtLeastRegex.test(password),
      upperCaseLetterCheck: passwordUpperCaseRegex.test(password),
      specialCharacterCheck: passwordSpecialCharacterRegex.test(password),
      lengthCheck: password?.length > 8,
    }));
  }, [watch('password')]);

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

    let emailTemp =
      emailValue().mobile && !emailInputValue
        ? mobileInputValue + emailSuffix
        : emailInputValue;

    try {
      dispatch(showLoader(true));

      const response = await checkCustomerAlreadyExist(emailTemp, storeId);

      if (isEmployeeLoggedIn && response.isCustomerExist) {
        await skipUserPasswordScreen(response.id);
        return;
      }

      if (isEmployeeLoggedIn) {
        dispatch(showLoader(false));
        continueAsGuest();
        return;
      }

      if (response.isCustomerExist || +response?.id > 0) {
        return dispatch(
          update_GuestUserInformation({
            type: 'GuestUserPasswordScreen',
            value: true,
          }),
        );
      }

      if (!response.isCustomerExist) {
        dispatch(
          update_GuestUserInformation({
            type: 'GuestUserCreateAccountScreen',
            value: true,
          }),
        );
      }

      dispatch(showLoader(false));
    } catch (err) {
      dispatch(showLoader(false));
      handleError(err);
    } finally {
      dispatch(showLoader(false));
    }
  };

  const skipUserPasswordScreen = async (registeredUserId: number) => {
    setCookie(USER_ID, JSON.stringify(Number(registeredUserId)));
    dispatch(setLoginUserId(Number(registeredUserId)));

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
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        dispatch(showLoader(false));
        dispatch(update_GuestUserInformation('CLEAN_UP'));
      });
  };

  const passwordOnSubmit = async () => {
    try {
      dispatch(showLoader(true));
      const apiPayload = {
        password: passwordValue().password,
        userName: email,
        storeId: storeId,
      };

      const userLoginData: number = await userLogin(apiPayload);
      dispatch(update_GuestUserInformation('CLEAN_UP'));

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

      const wishlistData = await getWishlist(+userLoginData);
      if (wishlistData) {
        dispatch(setWishlistData(wishlistData));
      }
      let payload = {
        storeId: storeId,
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
      dispatch(showLoader(false));
    } catch (err) {
      handleError(err);
      dispatch(showLoader(false));
    }
  };

  const creatAccountOnSubmit = async () => {
    try {
      dispatch(showLoader(true));
      const addAccount = {
        storeCustomerGuestModel: {
          id: 0,
          email:
            emailValue().email !== ''
              ? emailValue().email
              : emailValue().mobile + emailSuffix,
          password: guestAccountValues().password,
          confirmPassword: guestAccountValues().confirmPassword,
          storeId: storeId,
          recStatus: 'A',
        },
      };
      const userDetail = await createGuestAccount(addAccount);

      dispatch(update_GuestUserInformation('CLEAN_UP'));

      if (userDetail) {
        setCookie(USER_ID, JSON.stringify(Number(userDetail?.item1.id)));
        dispatch(setLoginUserId(Number(userDetail?.item1?.id)));
        dispatch(
          update_GuestUserInformation({
            type: 'GuestUserCreateAccountScreen',
            value: false,
          }),
        );
      }
      if (tempId) {
        const transfer = await updateCartByNewUserId(
          ~~tempId,
          userDetail?.item1.id,
        );
        if (transfer) {
          const cartDetails = await getCartDetails(userDetail?.item1.id, false);
          dispatch(addCartData(cartDetails));
        }
        deleteCookie(TEMPUSER_ID);
      }
    } catch (err) {
      handleError(err);
    } finally {
      dispatch(showLoader(false));
    }
  };

  const continueAsGuest = () => {
    dispatch(update_GuestUserInformation('CLEAN_UP'));
  };

  return cases.ready({
    Controller,
    creatAccountOnSubmit,
    passwordOnSubmit,
    emailOnSubmit,
    passwordControl,
    guestAccountControl,
    emailControl,
    guestAccountErrors,
    passwordErrors,
    emailErrors,
    guestAccountSubmitHandle,
    passowordSubmitHandle,
    emailSubmitHandle,
    emailTouchedFields,
    passwordTouchedFields,
    guuestAccountTouchedFields,
    continueAsGuest,
    changeConfirmPasswordVisibility,
    changePasswordVisibility,
    passwordVisbility,
    confirmPasswordVisbility,
    isEmployeeLoggedIn,
    passwordParameter
  });
};

export default GuestCheckoutController;
