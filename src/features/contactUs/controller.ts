'use client';
import { showLoader } from '@/app/redux/slices/commonSlice';
import { openAlertModal } from '@/app/redux/slices/modalSlice';
import { postContactUsData } from '@/shared/apis/contactUs/contactUs';
import storeDetails from '@/staticData/storeDetails.json';
import { paths } from '@/utils/paths.constant';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import React, { ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
interface _Props {
  configs: null;
  cases: {
    ready: (helper: _Helpers) => ReactElement<any, any>;
  };
}
interface _Helpers {
  hookForm: { errors: any; register: any; handleSubmit: any };
  onSubmit: (values: _Values) => void;
  verifiedCaptcha: 'VALID' | 'NOT_VALID' | null;
  verifyCaptcha: () => void;
  messageLength: number | undefined;
}
interface _Values {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  messageToGiftCard: string;
}

const ContactUsController: React.FC<_Props> = (_Props) => {
  const { cases } = _Props;
  const [status, setStatus] = useState<'ready'>('ready');
  const [verifiedCaptcha, setVerifiedCaptcha] = useState<
    'VALID' | 'NOT_VALID' | null
  >(null);
  const dispatch = useDispatch();
  const navigate = useRouter();

  const schema = yup.object({
    firstName: yup.string().required().label('First name'),
    lastName: yup.string().required().label('Last name'),
    email: yup.string().email().required().label('Email'),
    subject: yup.string().required().label('Subject'),
    messageToGiftCard: yup
      .string()
      .max(500, 'The message must not exceed 500 characters'),
  });

  const hookForm = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      subject: '',
      messageToGiftCard: '',
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = hookForm;

  const messageLength = hookForm.watch('messageToGiftCard')?.length;

  const onSubmit = async (value: _Values) => {
    dispatch(showLoader(true));
    try {
      const payload = {
        contactUsModel: {
          rowVersion: '',
          location: '',
          ipAddress: storeDetails.ipAddress,
          macAddress: storeDetails.macAddress,
          id: 0,
          name: `${value.firstName} ${value.lastName}`,
          email: value.email,
          subject: value.subject,
          address: '',
          city: '',
          county: '',
          state: '',
          zipCode: '',
          phone: '',
          comment: value.messageToGiftCard,
          storeId: storeDetails.storeId,
          recStatus: '',
          companyName: storeDetails.name,
          isReferral: false,
        },
      };
      await postContactUsData(payload);
      navigate.push(paths.thank_you);
    } catch (error: any) {
      dispatch(
        openAlertModal({
          title: '',
          description: 'Details not submitted',
          isAlertModalOpen: true,
        }),
      );
      console.log(error.message || 'Something wrong inside contact us');
    } finally {
      dispatch(showLoader(false));
    }
  };

  const verifyCaptcha = () => {
    setVerifiedCaptcha('VALID');
  };

  if (status === 'ready') {
    return cases.ready({
      hookForm: { register, errors, handleSubmit },
      onSubmit,
      verifiedCaptcha,
      verifyCaptcha,
      messageLength,
    });
  }
  return null;
};

export default ContactUsController;
