import { SendAsync } from '@/shared/utils/axios';
import { _CartItem } from '../cart/fetchCartProducts';

export interface _FetchOrderListPayload {
  args: {
    pageIndex: number;
    pageSize: number;
    pagingStrategy: number;
    sortingOptions: [
      {
        field: string;
        direction: number;
        priority: number;
      },
    ];
    filteringOptions: [
      {
        field: string;
        operator: number;
        value: string;
      },
    ];
  };
  storeID: number;
  customerId: number;
  filter: number;
  startDate: string | null;
  endDate: string | null;
}

export interface _OrdersArray {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: _Orders[];
}

export interface _Orders {
  orderNumber: number;
  orderStatus: string;
  orderDate: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  orderTotal: number;
  orderTrackLink: string;
  refundedOn?: string;
  shippingTrackingNumber: string | null;
  shoppingCartViewModels: _CartItem[];
  totalPrice: string;
}

export const fetchOrderList = async (
  storeID: number,
  customerId: number,
  filter: number,
  searchText?: string,
) => {
  const url = '/Order/OrderList.json';

  let payload = {
    args: {
      pageIndex: 1,
      pageSize: 100000,
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
          field: searchText ? 'orderNumber' : 'string',
          operator: 0,
          value: searchText ? searchText : 'string',
        },
      ],
    },
    storeID: storeID,
    customerId: customerId,
    filter: filter,
    startDate: null,
    endDate: null,
  };

  const res = await SendAsync<_OrdersArray>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
