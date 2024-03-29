'use client';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { setLoginUserDetails } from '@/app/redux/slices/userSlice';
import { createSecurityQuestionAnswer } from '@/shared/apis/user/creteSecurityQuestionAnswer';
import { getDecryptPassword } from '@/shared/apis/user/decryptUserPassword';
import { getUserDetailsById } from '@/shared/apis/user/fetchUserDetails';
import {
  _SecurityQuestionArray,
  getSecurityQuestions,
} from '@/shared/apis/user/getSecurityQuestions';
import {
  _UpdateUserDataFields,
  updateUserData,
} from '@/shared/apis/user/updateUserData';
import { USER_DETAILS, getUserId } from '@/shared/utils/cookie.helper';
import storeDetails from '@/staticData/storeDetails.json';
import { phoneRegExp } from '@/utils/helpers';
import { paths } from '@/utils/paths.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

interface CurrencyData {
  id: number;
  flag: string;
  name: string;
}

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: _Helpers) => ReactElement<any, any>;
  };
}
interface _Helpers {
  successMsg: boolean;
  onSubmit: any;
  hookForm: { errors: any; register: any; handleSubmit: any };
  activeCurrency: string;
  activeFlag: string;
  currencyData: CurrencyData[];
  handleCurrency: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: any;
  securityQuestion: _SecurityQuestionArray[];
  securityQuestionHookForm: {
    securityQuestionErros: any;
    securityQuesRegister: any;
    securityQuestionHandleSubmit: any;
  };
  securityQuestionSubmit: any;
  updatableStatus: boolean;
  setUpdatableStatus: React.Dispatch<React.SetStateAction<boolean>>;
}
const currencyData: CurrencyData[] = [
  { id: 0, flag: '/assets/images/flag.png', name: 'US Dollar' },
  { id: 1, flag: '/assets/images/euro.png', name: 'EUR' },
  { id: 2, flag: '/assets/images/gbp.png', name: 'GBP' },
];

const AccountSettingController: React.FC<_Props> = ({ cases }) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [open, setOpen] = useState(false);
  const [updatableStatus, setUpdatableStatus] = useState<boolean>(false);
  const [activeFlag, setActiveFlag] = useState(currencyData[0].flag);
  const [activeCurrency, setActiveCurrency] = useState(currencyData[0].name);
  const [userData, setUserData] = useState<any>();
  const [securityQuestion, setSecurityQuestions] = useState<
    _SecurityQuestionArray[]
  >([]);

  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const userId = getUserId();
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  useEffect(() => {
    reset({
      firstname: userData?.firstname,
      lastname: userData?.lastName,
      phonenumber: userData?.customerPhoneNumber,
    });
  }, [userData]);

  useEffect(() => {
    securityQuestionReset({
      questionId: userData?.securityQuestionMasterId
        ? userData?.securityQuestionMasterId
        : '',
      answer: userData?.customerSecurityQuestionAnswer
        ? userData?.customerSecurityQuestionAnswer
        : '',
    });

    userData?.securityQuestionMasterId && setUpdatableStatus(true);
  }, [userData, securityQuestion]);

  const schema = yup.object({
    firstname: yup.string().required().label('First Name'),
    lastname: yup.string().required().label('Last Name'),
    phonenumber: yup
      .string()
      .required('Phone Number is a required field')
      .max(12)
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  const securityQuestionSchema = yup.object({
    questionId: yup.string().required('Please select questions'),
    answer: yup.string().required('Answer is required'),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstname: '',
      lastname: '',
      phonenumber: '',
    },
  });

  const securityQuestionHookForm = useForm({
    resolver: yupResolver(securityQuestionSchema),
    defaultValues: {
      questionId: '',
      answer: '',
    },
  });

  const onSubmit = async (values: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    const decryptedPassword = await getDecryptPassword(userData?.password);
    const payload: _UpdateUserDataFields = {
      customerId: userId,
      firstName: values?.firstname,
      lastName: values?.lastname,
      password: decryptedPassword ? decryptedPassword : '',
      gender: '',
      customerPhoneNumber: values.phonenumber,
      companyName: '',
      jobTitle: '',
    };
    try {
      dispatch(showLoader(true));
      const updateUserDetails = await updateUserData(payload);
      if (updateUserDetails) {
        updateUserDetails && setSuccessMsg(true);
        const configuredUSerData = {
          firstName: updateUserDetails?.firstname,
          lastName: updateUserDetails.lastName,
          email: updateUserDetails.email,
          password: updateUserDetails.password,
          isRegistered: updateUserDetails.isRegistered,
        };
        dispatch(setLoginUserDetails(configuredUSerData));
        setCookie(USER_DETAILS, JSON.stringify(configuredUSerData));
      }
      dispatch(showLoader(false));
      setTimeout(() => {
        setSuccessMsg(false);
      }, 2000);
    } catch (err) {
      dispatch(showLoader(false));
      const errorMsg = err ? Object?.values(err)[0] : 'Something went wrong';
      dispatch(
        openAlertModal({
          title: 'Error',
          description: errorMsg,
          isAlertModalOpen: true,
        }),
      );
    }
  };

  const handleCurrency = (flag: string, name: string) => {
    setActiveFlag(flag);
    setActiveCurrency(name);
    setOpen(false);
  };

  const getUserData = async () => {
    let user = await getUserDetailsById(userId);
    setUserData(user);
  };

  const checkIfUserLoggedIn = async () => {
    if (!userId) {
      router.push(paths.login);
    } else {
      setStatus('loading');
      await getUserData();
      await fetchSecurityQuestion();
      setStatus('ready');
    }
  };

  const securityQuestionSubmit = async (values: any) => {
    const answerCreated = await createAnswer(values.answer, values.questionId);
    if (answerCreated) {
      securityQuestionReset({
        ...values,
        answer: values.answer,
      });

      setUpdatableStatus(true);
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = hookForm;

  const {
    register: securityQuesRegister,
    formState: { errors: securityQuestionErros },
    handleSubmit: securityQuestionHandleSubmit,
    setValue: securityQuesSetValue,
    reset: securityQuestionReset,
  } = securityQuestionHookForm;

  const fetchSecurityQuestion = async () => {
    const questions = await getSecurityQuestions();
    setSecurityQuestions(questions ?? []);
  };

  const createAnswer = async (answer: string, questionId: string) => {
    const questionAnswer = await createSecurityQuestionAnswer(
      storeDetails.storeId,
      userId,
      questionId,
      answer,
    );
    return questionAnswer;
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      successMsg,
      onSubmit,
      hookForm: { register, errors, handleSubmit },
      activeCurrency,
      activeFlag,
      currencyData,
      handleCurrency,
      open,
      setOpen,
      userData,
      securityQuestion,
      securityQuestionHookForm: {
        securityQuestionErros,
        securityQuesRegister,
        securityQuestionHandleSubmit,
      },
      securityQuestionSubmit,
      updatableStatus,
      setUpdatableStatus,
    });
  }

  return null;
};

export default AccountSettingController;
