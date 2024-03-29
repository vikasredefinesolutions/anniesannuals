import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getDecryptPassword } from '@/shared/apis/user/decryptUserPassword';
import { updateUserPassword } from '@/shared/apis/user/updateUserPassword';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  USER_DETAILS,
  getUserDetails,
  getUserId,
} from '@/shared/utils/cookie.helper';
import { useRouter } from 'next/navigation';
import { paths } from '@/utils/paths.constant';
import {
  passwordAtLeastRegex,
  passwordRegExp,
  passwordSpecialCharacterRegex,
  passwordUpperCaseRegex,
} from '@/utils/helpers';
import { PassThrough } from 'stream';
import { useDispatch } from 'react-redux';
import { setLoginUserDetails } from '@/app/redux/slices/userSlice';
import { setCookie } from 'cookies-next';
import { openAlertModal } from '@/app/redux/slices/modalSlice';

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
  hookForm: { errors: any; register: any; handleSubmit: any };
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  showTwo: boolean;
  setShowTwo: Dispatch<SetStateAction<boolean>>;
  userData: any;
  passwordShown: boolean;
  togglePasswordVisiblity: () => void;
  newPasswordShown: boolean;
  toggleNewPasswordVisiblity: () => void;
  decryptedPassword: string;
  Controller: any;
  control: any;
  passwordChecker: (password: string) => void;
  passwordParameter: IPasswordParam;
  setError: any;
}

interface IPasswordParam {
  lengthCheck: boolean;
  upperCaseLetterCheck: boolean;
  numberCheck: boolean;
  specialCharacterCheck: boolean;
}

const EmailPasswordController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [show, setShow] = useState<boolean>(false);
  const [showTwo, setShowTwo] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>();
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [newPasswordShown, setnewPasswordShown] = useState<boolean>(false);
  const [decryptedPassword, setDecryptedPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordParameter, setPasswordParameter] = useState<IPasswordParam>({
    lengthCheck: false,
    upperCaseLetterCheck: false,
    numberCheck: false,
    specialCharacterCheck: false,
  });
  const userId = getUserId();
  const userDetails = getUserDetails();
  const dispatch = useDispatch();
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const router = useRouter();

  const toggleNewPasswordVisiblity = () => {
    setnewPasswordShown(newPasswordShown ? false : true);
  };

  const getUserData = async () => {
    let user = await getUserDetailsById(userId);
    setUserData(userDetails);
    const decryptPassword = await getDecryptPassword(user?.password!);
    setDecryptedPassword(decryptPassword ?? '');
  };

  useEffect(() => {
    checkIfUserLoggedIn();
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

  const checkIfUserLoggedIn = async () => {
    if (!userId) {
      router.push(paths.login);
    } else {
      setStatus('loading');
      await getUserData();
      setStatus('ready');
    }
  };

  useEffect(() => {
    reset({ newemailaddress: userData?.email });
  }, [userData]);

  const onSubmit = (values: any) => {
    try {
      setStatus('loading');
      if (decryptedPassword !== values.currentpassword) {
        dispatch(
          openAlertModal({
            title: '',
            description: 'Password you entered is wrong',
            isAlertModalOpen: true,
          }),
        );
        return '';
      }
      updateUserPassword(
        values.currentpassword,
        values.newpassword,
        `${userId}`,
      );
      // getUserData();
      setDecryptedPassword(values.newpassword);
      const configuredUSerData = {
        ...userDetails,
        password: values.newpassword,
      };
      dispatch(setLoginUserDetails(configuredUSerData));
      setCookie(USER_DETAILS, JSON.stringify(configuredUSerData));
      setDecryptedPassword(values.newpassword);

      setShowTwo(false);
    } catch (err) {
      console.log(err);
    } finally {
      setStatus('ready');
      reset({
        newpassword: '',
        currentpassword: '',
        confirmpassword: '',
      });
    }
  };

  const schema = yup.object({
    currentpassword: yup.string().required('Current password is required'),
    newpassword: yup
      .string()
      .required('New password is required')
      .matches(passwordRegExp, 'Password must match the below criteria'),
    newemailaddress: yup.string(),
    confirmpassword: yup
      .string()
      .oneOf([yup.ref('newpassword')], 'Passwords must match'),
  });
  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      newemailaddress: '',
      newpassword: '',
      currentpassword: '',
      confirmpassword: '',
    },
  });

  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
    reset,
    setError,
  } = hookForm;

  const passwordChecker = (password: string) => {
    setPassword(password);
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
      show,
      setShow,
      showTwo,
      setShowTwo,
      userData,
      passwordShown,
      togglePasswordVisiblity,
      newPasswordShown,
      toggleNewPasswordVisiblity,
      decryptedPassword,
      Controller,
      control,
      passwordChecker,
      passwordParameter,
      setError,
    });
  }

  return null;
};

export default EmailPasswordController;
