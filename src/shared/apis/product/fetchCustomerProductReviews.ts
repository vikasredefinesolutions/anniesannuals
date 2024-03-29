import { SendAsync } from '@/shared/utils/axios';

export interface ICustomerProductReview {
  id: number;
  productId: number;
  productName: string;
  productSename: string;
  productImage: string;
  customerId: number;
  storeId: number;
  commentHeading: string;
  comment: string;
  rating: number;
  helpFullCount: number;
  notHelpFullCount: number;
  recStatus: string;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  images: any;
  isRecommend: boolean;
  createdDate: string | null;
}

export interface ICustomerReviewsArray {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: ICustomerProductReview[];
}

export const fetchCustomerProductReviews = async (
  storeId: number,
  customerId: number,
) => {
  try {
    const url = `/StoreProduct/customerproductreviewslist.json`;
    let payload = {
      args: {
        pageIndex: 1,
        pageSize: 10000,
        pagingStrategy: 0,
        sortingOptions: [
          {
            field: 'string',
            direction: 0,
            priority: 0,
          },
        ],
        filteringOptions: [
          {
            field: 'string',
            operator: 0,
            value: 'string',
          },
        ],
      },
      storeID: storeId,
      customerId: customerId,
    };
    const reviewList = await SendAsync<ICustomerReviewsArray>({
      url,
      method: 'POST',
      data: payload,
    });
    return reviewList.items;
  } catch (error) {
    console.log(error, 'error');
  }
};
