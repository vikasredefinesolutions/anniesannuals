'use client';
import { postReviewCount } from '@/shared/apis/product/product';
import { IProductReviews } from '@/shared/types/product';
import { getUserId } from '@/shared/utils/cookie.helper';
import { getLocation } from '@/shared/utils/helper';
import storeDetails from '@/staticData/storeDetails.json';
import { paths } from '@/utils/paths.constant';
import { useRouter } from 'next/navigation';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { IReviewAction } from './type';
import { useDispatch } from 'react-redux';
import { openAlertModal } from '@/app/redux/slices/modalSlice';

interface _ReviewHelpers {
  config: {
    showReviewsRatings: boolean;
    showPagination: boolean;
    isReviewActionsEnabled: boolean;
  };
  seeAllReview: boolean;
  currentPage: number;
  reviews: IProductReviews[];
  handlePageChange: (page: number) => void;
  handleReviewAction: (actionType: IReviewAction, reviewId: number) => void;
  handleSeeAllReviews: () => void;
  filterReview: (start: number) => void;
  productSortBy: string;
  setproductSortBy: (start: string) => void;
  activeFilter: string | number | null;
}
interface _Props {
  config: {
    showReviewsRatings: boolean;
    showPagination: boolean;
    isReviewActionsEnabled: boolean;
  };
  productReviews: IProductReviews[];
  seName: string;
  cases: {
    view: (helpers: _ReviewHelpers) => ReactElement<any, any>;
  };
}
const ReviewController: React.FC<_Props> = ({
  cases,
  config,
  productReviews,
  seName,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [seeAllReview, setSeeAllReview] = useState(false);
  const [productReviewstpshow, setProductReviewstpShow] =
    useState(productReviews);
  const [activeFilter, setActiveFilter] = useState<string | number | null>(
    null,
  );
  useState(productReviews);
  const [productSortBy, setproductSortBy] = useState('Most Recent');
  useState(productReviews);
  const router = useRouter();
  const dispatch = useDispatch();

  const reviews = useMemo(() => {
    if (seeAllReview) return productReviewstpshow;
    const indexOfLastReview = currentPage * 3;
    const indexOfFirstReview = indexOfLastReview - 3;
    return productReviewstpshow.slice(indexOfFirstReview, indexOfLastReview);
  }, [currentPage, productReviewstpshow, seeAllReview]);

  const filterReview = (filtercondition: string | number) => {
    setActiveFilter(filtercondition);
    const productReviews14 = productReviews.filter((el) => {
      if (el.rating == filtercondition) {
        return el;
      }
    });
    setProductReviewstpShow(productReviews14);
  };
  useEffect(() => {
    sortReview(productSortBy);
  }, [productSortBy]);
  const sortReview = (filtercondition: string | number) => {
    const newProductReviews = [...productReviews];
    const productReviews14 = newProductReviews.sort(
      (el1: IProductReviews, el2: IProductReviews) => {
        if (filtercondition == 'Most Recent') {
          return (
            new Date(el2.reviewDate).getTime() -
            new Date(el1.reviewDate).getTime()
          );
        }
        if (filtercondition == 'Oldest') {
          return (
            new Date(el1.reviewDate).getTime() -
            new Date(el2.reviewDate).getTime()
          );
        }
        return (
          new Date(el1.reviewDate).getTime() -
          new Date(el2.reviewDate).getTime()
        );
      },
    );
    setProductReviewstpShow(productReviews14);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSeeAllReviews = () => {
    if (productReviews.length > reviews.length) {
      setActiveFilter(null);
      setProductReviewstpShow(productReviews);
      setSeeAllReview(true);
    } else {
      setSeeAllReview(!seeAllReview);
    }
  };
  const handleReviewAction = async (
    actionType: IReviewAction,
    reviewId: number,
  ) => {
    const userId = getUserId();

    const { storeId } = storeDetails;
    if (!userId) return router.push(`${paths.login}?redirect=/${seName}.html`);
    try {
      const data = getLocation();
      const requestObject = {
        storeProductReviewCount: {
          id: 0,
          recStatus: 'A',
          rowVersion: '',
          ipAddress: data.ip_address,
          customerId: userId,
          macAddress: '00-00-00-00-00-00',
          location: `${data?.city}, ${data?.region}, ${data?.country}, ${data?.postal_code}`,
          storeid: storeId,
          reviewId: reviewId,
          yes: actionType === 'like' ? 1 : 0,
          no: actionType === 'dislike' ? 1 : 0,
        },
      };

      await postReviewCount(requestObject);
      dispatch(
        openAlertModal({
          title: 'Success',
          description: 'Review feedback success',
          isAlertModalOpen: true,
        }),
      );
    } catch (error: any) {
      const errMsg = Object.keys(error).length
        ? error[Object.keys(error)[0]]
        : 'Something went wrong';
      dispatch(
        openAlertModal({
          title: 'Error',
          description: errMsg,
          isAlertModalOpen: true,
        }),
      );
    }
  };

  return cases.view({
    config,
    currentPage,
    handlePageChange,
    handleReviewAction,
    handleSeeAllReviews,
    reviews,
    seeAllReview,
    filterReview,
    productSortBy,
    setproductSortBy,
    activeFilter,
  });
};

export default ReviewController;
