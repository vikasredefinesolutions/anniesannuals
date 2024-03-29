import { ForgetCustomerPassword } from '@/shared/apis/user/customerForgotPasswordLink';
import { useForm } from 'react-hook-form';
import React, { ReactElement, useState } from 'react';
import storeDetails from '@/staticData/storeDetails.json';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getUserDetails } from '@/shared/utils/cookie.helper';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { openAlertModal } from '@/app/redux/slices/modalSlice';

interface _ReadyProps {
  sendCustomerChangePasswordLink: any;
  storeId: number;
  email: string | undefined;
  onSubmit: any;
  hookForm: { errors: any; register: any; handleSubmit: any };
  captchaHandler: (value: any) => void;
  captchaVerified: string | null;
}

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
}

const ForgotPasswordController: React.FC<_Props> = (_Props) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [captchaVerified, setverifiedRecaptch] = useState<
    'NOT_VALID' | null | 'VALID'
  >(null);
  const userData = getUserDetails();
  const email = userData?.email;
  const storeId = storeDetails.storeId;
  const { cases } = _Props;
  const router = useRouter();
  const dispatch = useDispatch();

  const schema = yup.object({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email is required'),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const captchaHandler = (value: any) => {
    setverifiedRecaptch('VALID');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = hookForm;

  const sendCustomerChangePasswordLink = async (
    storeId: number,
    email: string,
  ) => {
    try {
      let payload = {
        storeId: storeId,
        email: email,
      };
      const linkSent = await ForgetCustomerPassword(payload);
      if (linkSent?.issend) {
        dispatch(
          openAlertModal({
            title: 'Success',
            description: `Link sent successfully at your email ${email}`,
            isAlertModalOpen: true,
          }),
        ),
          router.push(`/`);
      } else {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: 'Email is not verified',
            isAlertModalOpen: true,
          }),
        );
      }
    } catch (error) {
      console.log('Something went wrong', error);
    } finally {
      setverifiedRecaptch('NOT_VALID');
    }
  };

  const onSubmit = async (values: any) => {
    sendCustomerChangePasswordLink(storeId, values.email);
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      sendCustomerChangePasswordLink,
      storeId,
      email,
      onSubmit,
      hookForm: { register, errors, handleSubmit },
      captchaHandler,
      captchaVerified,
    });
  }

  return null;
};

export default ForgotPasswordController;
