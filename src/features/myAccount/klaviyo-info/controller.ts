import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import {
  IOrderDetailPreference,
  getCustomerPreference,
} from '@/shared/apis/klviyoInfo/getPrefference';
import { updateCustomerKlaviyo } from '@/shared/apis/klviyoInfo/updateCustomerKlaviyoPreference';
import { getStoreId, getUserId } from '@/utils/cookie.helper';
import {
  __ValidationText,
  phonePattern1,
  phonePattern2,
  phonePattern3,
  phonePattern4,
} from '@/utils/helpers';

import { yupResolver } from '@hookform/resolvers/yup';
import React, { ReactElement, useState } from 'react';
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

interface _ReadyProps {
  userData: IOrderDetailPreference | null;
  register: UseFormRegister<_Values>;
  handleSubmit: UseFormHandleSubmit<_Values, any>;
  errors: FieldErrors<_Values>;
  fetchKlaviyoUserData: () => void;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (values: _Values) => void;
  setUserData: React.Dispatch<
    React.SetStateAction<IOrderDetailPreference | null>
  >;
}

export interface _Values {
  firstName: string;
  lastName: string;
  phone: string;
  isUnSubscribeMarketingEmail: boolean;
  isUnSubscribeAllSms: boolean;
  isDoNotShareMyDetailsAnyOne: boolean;
  isEmailLocalEventsHappeningInNursey: boolean;
  isRemoveFromPhysicalMailing: boolean;
}
interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
}

const KlaviyoInfoController: React.FC<_Props> = (_Props) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [userData, setUserData] = useState<IOrderDetailPreference | null>(null);
  const [userEmail, setUserEmail] = useState<string>('');
  const storeId = getStoreId();
  const userId = getUserId();

  const fetchKlaviyoUserData = async () => {
    try {
      dispatch(showLoader(true));

      if (!userEmail.trim()) {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: 'Please enter email to proceed!',
            isAlertModalOpen: true,
          }),
        );
        return;
      }

      const data = await getCustomerPreference(`${storeId}`, userEmail.trim());
      if (data && data?.email) {
        setUserData(data);
        setValue('firstName', data?.firstname);
        setValue('lastName', data?.lastName);
        setValue('phone', data?.customerPhoneNumber);
        setValue(
          'isDoNotShareMyDetailsAnyOne',
          data?.isDoNotShareMyDetailsAnyOne,
        );
        setValue(
          'isEmailLocalEventsHappeningInNursey',
          data?.isEmailLocalEventsHappeningInNursey,
        );
        setValue('isUnSubscribeAllSms', data?.isUnSubscribeAllSms);
        setValue(
          'isUnSubscribeMarketingEmail',
          data?.isUnSubscribeMarketingEmail,
        );
        setValue(
          'isRemoveFromPhysicalMailing',
          data?.isRemoveFromPhysicalMailing,
        );
      } else {
        dispatch(
          openAlertModal({
            title: 'Error',
            description: 'Email does not exist!',
            isAlertModalOpen: true,
          }),
        );
      }
    } catch (error) {
      const errorMsg = error
        ? Object?.values(error)[0]
        : 'Something went wrong';
      dispatch(
        openAlertModal({
          title: 'Error',
          description: errorMsg,
          isAlertModalOpen: true,
        }),
      );
    } finally {
      dispatch(showLoader(false));
    }
  };

  const onSubmit = async (values: _Values) => {
    try {
      dispatch(showLoader(true));
      let payload = {
        storeId: storeId,
        email: userEmail,
        customerId: userId ? userId : 0,
        firstName: values?.firstName,
        lastName: values?.lastName,
        customerPhoneNumber: values?.phone,
        isUnSubscribeMarketingEmail: values?.isUnSubscribeMarketingEmail,
        isUnSubscribeAllSms: values?.isUnSubscribeAllSms,
        isDoNotShareMyDetailsAnyOne: values?.isDoNotShareMyDetailsAnyOne,
        isEmailLocalEventsHappeningInNursey:
          values?.isEmailLocalEventsHappeningInNursey,
        isRemoveFromPhysicalMailing: values?.isRemoveFromPhysicalMailing,
      };

      const updateData = await updateCustomerKlaviyo(payload);

      dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Data saved successfully.',
          isAlertModalOpen: true,
        }),
      );
    } catch (error) {
      const errorMsg = error
        ? Object?.values(error)[0]
        : 'Something went wrong';
      dispatch(
        openAlertModal({
          title: 'Error',
          description: errorMsg,
          isAlertModalOpen: true,
        }),
      );
    } finally {
      dispatch(showLoader(false));
    }
  };

  const schema = yup.object({
    firstName: yup.string().trim().required('First name is required'),
    lastName: yup.string().trim().required('Last name is required'),
    phone: yup
      .string()
      .trim()
      .required(__ValidationText.phone.required)
      .test('phone-test', __ValidationText.phone.valid, (value) => {
        if (
          phonePattern1.test(value || '') ||
          phonePattern2.test(value || '') ||
          phonePattern3.test(value || '') ||
          phonePattern4.test(value || '')
        ) {
          return true;
        }
        return false;
      }),
    isUnSubscribeMarketingEmail: yup.boolean().default(false),
    isUnSubscribeAllSms: yup.boolean().default(false),
    isDoNotShareMyDetailsAnyOne: yup.boolean().default(false),
    isEmailLocalEventsHappeningInNursey: yup.boolean().default(false),
    isRemoveFromPhysicalMailing: yup.boolean().default(false),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: { firstName: '', lastName: '', phone: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = hookForm;

  const { cases } = _Props;

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      userData,
      register,
      handleSubmit,
      errors,
      fetchKlaviyoUserData,
      setUserEmail,
      onSubmit,
      setUserData,
    });
  }

  return null;
};

export default KlaviyoInfoController;
