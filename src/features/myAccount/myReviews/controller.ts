import OrderDetails from '@/app/order-return-details/page';
import {
  ICustomerProductReview,
  fetchCustomerProductReviews,
} from '@/shared/apis/product/fetchCustomerProductReviews';
import {
  IUserCookie,
  getUserDetails,
  getUserId,
} from '@/shared/utils/cookie.helper';
import React, { ReactElement, useEffect, useState } from 'react';
import storeDetails from '@/staticData/storeDetails.json';
import { useRouter } from 'next/navigation';
import { paths } from '@/utils/paths.constant';

interface _ReadyProps {
  reviewsList: ICustomerProductReview[] | [];
}
interface _Props {
  configs: null;
  cases: {
    loading: () => ReactElement<any, any>;
    empty: () => ReactElement<any, any>;
    ready: (_ReadyProps: _ReadyProps) => ReactElement<any, any>;
  };
}

const MyReviewController: React.FC<_Props> = (_Props) => {
  const [status, setStatus] = useState<'loading' | 'empty' | 'ready'>('ready');
  const [reviewsList, setReviewsList] = useState<ICustomerProductReview[] | []>(
    [],
  );
  const router = useRouter();
  const userData = getUserDetails();
  const userId = getUserId();
  const { cases } = _Props;

  useEffect(() => {
    checkIfUserLoggedIn();
  }, []);

  const checkIfUserLoggedIn = () => {
    if (!userId) {
      router.push(paths.login);
    } else {
      fetchReviews();
    }
  };

  const fetchReviews = async () => {
    setStatus('loading');

    const reviews = await fetchCustomerProductReviews(
      storeDetails.storeId,
      userId,
    );
    reviews && setReviewsList(reviews);
    setStatus('ready');
  };

  if (status === 'loading') {
    return cases.loading();
  }

  if (status === 'empty') {
    return cases.empty();
  }

  if (status === 'ready') {
    return cases.ready({ reviewsList });
  }

  return null;
};

export default MyReviewController;
