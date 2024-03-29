'use client';
import { userSignup } from '@/shared/apis/user/userSignUp';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { paths } from '@/utils/paths.constant';
import { useRouter, useSearchParams } from 'next/navigation';
import React, {
  ReactElement,
  SetStateAction,
  use,
  useEffect,
  useState,
} from 'react';
import * as yup from 'yup';
import {
  _SignInFormFields,
  initialSignUpPayload,
} from '../../../shared/apis/user/userSignUp';
import { _Config, initialValidationScheme } from './config';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCookie } from 'cookies-next';
import { USER_DETAILS, USER_ID } from '@/shared/utils/cookie.helper';
import { useDispatch } from 'react-redux';
import {
  setLoginUserDetails,
  setLoginUserId,
} from '@/app/redux/slices/userSlice';
import {
  passwordAtLeastRegex,
  passwordSpecialCharacterRegex,
  passwordUpperCaseRegex,
} from '@/utils/helpers';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { PixelTracker } from '@/shared/utils/facebookPixel';

type _Props = {
  config: _Config;
  cases: {
    view: (helpers: _Helpers) => ReactElement<any, any>;
  };
};

interface IPasswordParam {
  lengthCheck: boolean;
  upperCaseLetterCheck: boolean;
  numberCheck: boolean;
  specialCharacterCheck: boolean;
}

interface _Helpers {
  passwordShown: boolean;
  setPasswordShown: React.Dispatch<React.SetStateAction<boolean>>;
  conformPassowrdPasswordShown: boolean;
  setConformPassowrdPasswordShown: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  hookForm: { errors: any; register: any; handleSubmit: any };
  errorMessage: any;
  onSubmit: any;
  config?: _Config;
  onChange: () => void;
  verifiedCaptcha: 'VALID' | 'NOT_VALID' | null;
  verifyCaptcha: () => void;
  setPassword: React.Dispatch<SetStateAction<string>>;
  passwordParameter: IPasswordParam;
}

const SignupController: React.FC<_Props> = ({ cases, config }) => {
  const schema = yup.object(initialValidationScheme(config));
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const searchParams = useSearchParams();
  const prevRoute = searchParams.get('redirect');
  const [password, setPassword] = useState<string>('');
  const [passwordParameter, setPasswordParameter] = useState<IPasswordParam>({
    lengthCheck: false,
    upperCaseLetterCheck: false,
    numberCheck: false,
    specialCharacterCheck: false,
  });
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [conformPassowrdPasswordShown, setConformPassowrdPasswordShown] =
    useState<boolean>(false);
  const [verifiedCaptcha, setVerifiedCaptcha] = useState<
    'VALID' | 'NOT_VALID' | null
  >(null);

  useEffect(() => {
    setPasswordParameter((prevPasswordParameter) => ({
      ...prevPasswordParameter,
      numberCheck: passwordAtLeastRegex.test(password),
      upperCaseLetterCheck: passwordUpperCaseRegex.test(password),
      specialCharacterCheck: passwordSpecialCharacterRegex.test(password),
      lengthCheck: password.length > 8,
    }));
  }, [password]);
  const dispatch = useDispatch();
  const onChange = () => {
    setErrorMessage(null);
  };

  const { } = useForm({});
  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      LastName: '',
      Firstname: '',
      password: '',
      phone: '',
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = hookForm;

  const onSubmit = async (values: any) => {
    try {
      dispatch(showLoader(true));
      const payload: _SignInFormFields = {
        storeCustomerModel: {
          ...initialSignUpPayload.storeCustomerModel,
          Firstname: values.Firstname,
          LastName: values.LastName,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          customerPhoneNumber: values.phone,
        },
      };
      const userSignUpData: any = await userSignup(payload);

      if (userSignUpData.success) {
        setCookie(
          USER_ID,
          JSON.stringify(Number(userSignUpData?.data?.item1?.id)),
        );
        dispatch(setLoginUserId(Number(userSignUpData?.data?.item1?.id)));

        const configuredUSerData = {
          firstName: userSignUpData.data?.item1?.firstname,
          lastName: userSignUpData.data?.item1?.lastName,
          email: userSignUpData.data?.item1?.email,
          password: userSignUpData.data?.item1?.password,
          isRegistered: userSignUpData.data?.item1?.isRegistered,
        };
        setCookie(USER_DETAILS, JSON.stringify(configuredUSerData));
        dispatch(setLoginUserDetails(configuredUSerData));
      }

      if (userSignUpData.success) {
        const pixelPayloadForLead = {
          value: 0,
          currency: 'USD',
          content_name: 'Report',
          content_category: 'B2B'
        }
        PixelTracker('track', 'Lead', pixelPayloadForLead)
        const pixelPayloadForRegisteration = {
          value: 0,
          currency: 'USD',
          content_name: 'Signup',
          status: 'complete'
        }
        PixelTracker('track', 'CompleteRegistration', pixelPayloadForRegisteration)
        router.push(prevRoute ? prevRoute : paths.home);
      }
      if (!userSignUpData.success) {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: userSignUpData.errors?.['storeCustomerModel.Email'],
            isAlertModalOpen: true,
          }),
        );
        setErrorMessage(userSignUpData.errors?.['storeCustomerModel.Email']);
      }
    } catch (err) {
      console.log('error in sign up', err);
    } finally {
      dispatch(showLoader(false));
    }
  };

  const verifyCaptcha = () => {
    setVerifiedCaptcha('VALID');
  };

  return cases.view({
    passwordShown,
    setPasswordShown,
    conformPassowrdPasswordShown,
    setConformPassowrdPasswordShown,
    hookForm: { register, errors, handleSubmit },
    errorMessage,
    onSubmit,
    onChange,
    config,
    verifiedCaptcha,
    verifyCaptcha,
    setPassword,
    passwordParameter,
  });
};

export default SignupController;
