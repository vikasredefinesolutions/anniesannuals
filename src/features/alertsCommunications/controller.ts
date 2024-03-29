'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { _UpdateUserDataFields } from '@/shared/apis/user/updateUserData';
import { _SecurityQuestionArray } from '@/shared/apis/user/getSecurityQuestions';
import {
  _createSubscribeDetailsFields,
  createSubscribeDetails,
} from '@/shared/apis/user/createSubscribeDetails';
import storeDetails from '@/staticData/storeDetails.json';
import { getUserId } from '@/shared/utils/cookie.helper';
import { getLocation } from '@/utils/helpers';
import { getSubscribeDetailsForAlertCommunications } from '@/shared/apis/user/getSubscribeDetailsForAlertCommunications';

interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (helper: _Helpers) => ReactElement<any, any>;
  };
}

type SubscribeDetailsType = {
  frequency: string;
  content: string[];
  phone: string;
};
interface _Helpers {
  onSubmit: () => Promise<void>;
  successMsg: boolean;
  hookForm: { register: any; handleSubmit: any };
  subscribeDetails: SubscribeDetailsType;
  handleSubScribeDetailsChange: (
    type: 'frequency' | 'content' | 'phone',
    value: string,
  ) => void;
}

const AlertscommunicationsController: React.FC<_Props> = ({ cases }) => {
  const createSubscribeDetailsFields: Record<string, string> = {
    'No limit - Receive all emails': 'isEmailNoLimit',
    'No more than once a week': 'isEmailNoOnceWeek',
    'No more than once a month': 'isEmailNoOnceMonth',
    'Unsubscribe from all marketing emails': 'isEmailUnsubscribeMarketing',
    'Calls from us about everything from events and your orders to birthday wishes.':
      'isPhoneCallsEventsOrdersToBirthday',
  };

  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  const [subscribeDetails, setSubscribeDetails] =
    useState<SubscribeDetailsType>({
      frequency: '',
      content: [],
      phone: '',
    });
  const { storeId } = storeDetails;
  const userId = getUserId();

  const handleSubScribeDetailsChange = (
    type: 'frequency' | 'content' | 'phone',
    value: string,
  ) => {
    if (type === 'frequency') {
      setSubscribeDetails((prevDetails: SubscribeDetailsType) => ({
        ...prevDetails,
        frequency: value,
      }));
    } else if (type === 'phone') {
      setSubscribeDetails((prevDetails: SubscribeDetailsType) => {
        let phonePreference = '';
        if (!prevDetails.phone) {
          phonePreference = value;
        }
        return {
          ...prevDetails,
          phone: phonePreference,
        };
      });
    } else if (type === 'content') {
      if (value === 'isContentNoPrefrence') {
        setSubscribeDetails((prevDetails: SubscribeDetailsType) => ({
          ...prevDetails,
          content: ['isContentNoPrefrence'],
        }));
      } else {
        setSubscribeDetails((prevDetails: SubscribeDetailsType) => {
          let preferences = [...prevDetails.content].filter(
            (pref) => pref !== 'isContentNoPrefrence',
          );
          if (preferences.includes(value)) {
            preferences = preferences.filter((pref) => pref !== value);
          } else {
            preferences = [...preferences, value];
          }

          return {
            ...prevDetails,
            content: preferences,
          };
        });
      }
    }
  };

  const getSubscribeDetails = async () => {
    const response = await getSubscribeDetailsForAlertCommunications({
      customerId: +userId || 0,
      storeId: storeId,
    });
    const { frequency, content, phone } = response;
    const contentPreferences = [];
    if (content.includes('No Prefrence')) {
      contentPreferences.push('isContentNoPrefrence');
    } else {
      if (
        content.includes(
          'Promotional Emails (coupons, exclusive deals, and inspirations.)',
        )
      )
        contentPreferences.push('isContentPromotionalEmails');
      if (
        content.includes(
          "Product Review Emails (request to review products you've purchased)",
        )
      )
        contentPreferences.push('isContentProductReviewEmails');
    }
    setSubscribeDetails({
      frequency: createSubscribeDetailsFields[frequency],
      content: contentPreferences,
      phone: createSubscribeDetailsFields[phone],
    });
  };

  useEffect(() => {
    getSubscribeDetails();
  }, []);

  const hookForm = useForm({
    defaultValues: {},
  });

  const onSubmit = async () => {
    try {
      const data = getLocation();
      const payload: _createSubscribeDetailsFields = {
        subscribeDetailsModel: {
          rowVersion: '',
          location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
          ipAddress: data.ip_address,
          macAddress: '00-00-00-00-00-00',
          id: 0,
          storeId: storeId,
          customerId: +userId || 0,
          isEmailNoLimit: subscribeDetails.frequency === 'isEmailNoLimit',
          isEmailNoOnceWeek: subscribeDetails.frequency === 'isEmailNoOnceWeek',
          isEmailNoOnceMonth:
            subscribeDetails.frequency === 'isEmailNoOnceMonth',
          isEmailUnsubscribeMarketing:
            subscribeDetails.frequency === 'isEmailUnsubscribeMarketing',
          isContentNoPrefrence: subscribeDetails.content.includes(
            'isContentNoPrefrence',
          ),
          isContentPromotionalEmails: subscribeDetails.content.includes(
            'isContentPromotionalEmails',
          ),
          isContentProductReviewEmails: subscribeDetails.content.includes(
            'isContentProductReviewEmails',
          ),
          isPhoneCallsEventsOrdersToBirthday:
            subscribeDetails.phone === 'isPhoneCallsEventsOrdersToBirthday',
          recStatus: 'A',
        },
      };
      const isUpdated = await createSubscribeDetails(payload);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      if (isUpdated) {
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
        }, 4000);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const { register, handleSubmit } = hookForm;

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({
      onSubmit,
      hookForm: { register, handleSubmit },
      subscribeDetails,
      handleSubScribeDetailsChange,
      successMsg,
    });
  }

  return null;
};

export default AlertscommunicationsController;
