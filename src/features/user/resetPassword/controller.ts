'use client';
import React, {
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  passwordAtLeastRegex,
  passwordRegExp,
  passwordSpecialCharacterRegex,
  passwordUpperCaseRegex,
} from '@/utils/helpers';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { useAppDispatch } from '@/app/redux/hooks';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetEmailByResetToken } from '@/shared/apis/user/getUserEmailByToken';
import storeDetails from '@/staticData/storeDetails.json';
import { ResetPassword } from '@/shared/apis/user/createNewPassword';
import { paths } from '@/utils/paths.constant';
import { openAlertModal } from '@/app/redux/slices/modalSlice';

interface _ReadyProps {
  onSubmit: any;
  hookForm: { errors: any; register: any; handleSubmit: any };
  tokenEmail: string;
  setPassword: React.Dispatch<SetStateAction<string>>;
  passwordParameter: IPasswordParam;
  setToggleVisibilityPassword: React.Dispatch<SetStateAction<boolean>>;
  setToggleVisibilityConfirmPassword: React.Dispatch<SetStateAction<boolean>>;
  toggleVisibilityPassword: boolean;
  toggleVisibilityConfirmPassword: boolean;
}

interface IPasswordParam {
  lengthCheck: boolean;
  upperCaseLetterCheck: boolean;
  numberCheck: boolean;
  specialCharacterCheck: boolean;
}

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
}

const ResetPasswordController: React.FC<_Props> = (_Props) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>(
    'loading',
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [tokenEmail, setTokenEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordParameter, setPasswordParameter] = useState<IPasswordParam>({
    lengthCheck: false,
    upperCaseLetterCheck: false,
    numberCheck: false,
    specialCharacterCheck: false,
  });
  const [toggleVisibilityPassword, setToggleVisibilityPassword] =
    useState<boolean>(false);
  const [toggleVisibilityConfirmPassword, setToggleVisibilityConfirmPassword] =
    useState<boolean>(false);
  const initialFilter = searchParams.get('token');
  const storeId = storeDetails.storeId;
  const { cases } = _Props;

  useEffect(() => {
    checkTokenValidity();
  }, []);

  useEffect(() => {
    setPasswordParameter((prevPasswordParameter) => ({
      ...prevPasswordParameter,
      numberCheck: passwordAtLeastRegex.test(password),
      upperCaseLetterCheck: passwordUpperCaseRegex.test(password),
      specialCharacterCheck: passwordSpecialCharacterRegex.test(password),
      lengthCheck: password.length > 8,
    }));
  }, [password]);

  const checkTokenValidity = async () => {
    try {
      if (initialFilter) {
        const response = await GetEmailByResetToken({
          token: initialFilter,
          storeId: storeId,
        });

        if (response == 'INVALID_TOKEN') {
          setStatus('ready');
          dispatch(
            openAlertModal({
              title: '',
              description: 'Token is expired or wrong token provided',
              isAlertModalOpen: true,
            }),
          ),
            router.push(paths.home);
        } else {
          setStatus('ready');
          setTokenEmail(response);
        }
      } else {
        setStatus('ready');
        dispatch(
          openAlertModal({
            title: '',
            description: 'TOKEN NOT FOUND',
            isAlertModalOpen: true,
          }),
        ),
          router.push(paths.home);
      }
    } catch (error) {
      console.log(error, '<----error');
    }
  };

  const schema = yup.object({
    newpassword: yup
      .string()
      .required('New password is required')
      .matches(passwordRegExp, 'Password must match the below criteria'),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('newpassword')], 'Passwords must match'),
    // securityAnswer: yup.string().required(),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newpassword: '',
      confirmpassword: '',
      // securityAnswer: '',
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
      let payload = {
        emailId: '',
        tokenCode: initialFilter!,
        newPassword: values.newpassword,
        reEnterPassword: values.confirmpassword,
      };

      const response = await ResetPassword(payload);
      dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Password reset successfully',
          isAlertModalOpen: true,
        }),
      ),
        router.push(paths.home);
    } catch (err) {
      dispatch(
        openAlertModal({
          title: 'Error',
          description: err,
          isAlertModalOpen: true,
        }),
      );
    } finally {
      dispatch(showLoader(false));
    }
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
      hookForm: { register, errors, handleSubmit },
      tokenEmail,
      setPassword,
      passwordParameter,
      setToggleVisibilityPassword,
      setToggleVisibilityConfirmPassword,
      toggleVisibilityPassword,
      toggleVisibilityConfirmPassword,
    });
  }

  return null;
};

export default ResetPasswordController;
