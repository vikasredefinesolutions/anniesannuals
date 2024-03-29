import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: _Helper) => ReactElement<any, any>;
  };
}

interface _Helper {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  onSubmit: any;
  hookForm: { errors?: any; register: any; handleSubmit: any };
}

const AuthoriserdUserController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [show, setShow] = useState<boolean>(false);

  const schema = yup.object({
    adduser_firstname: yup.string().required().label('First Name'),
    adduser_lastname: yup.string().required().label('Last Name'),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      adduser_firstname: '',
      adduser_lastname: '',
    },
  });

  const onSubmit = (values: any) => {
    console.log(values, 'aderdfad');
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = hookForm;

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
      show,
      setShow,
    });
  }

  return null;
};

export default AuthoriserdUserController;
