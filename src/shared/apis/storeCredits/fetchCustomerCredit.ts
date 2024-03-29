import { SendAsync } from '@/shared/utils/axios';

export interface StoreCreditResponse {
  customerID: number;
  storeCreditRefundBalance: number;
  giftCardWalletBalance: number;
}

export interface StoreCredit {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  items: {
    creditAmount: number;
    balanceAmount: number;
    reason: string;
    createdDate: string;
  }[];
}

export interface StoreCreditPayload {
  args: {
    pageIndex: number;
    pageSize: number;
    pagingStrategy: number;
    sortingOptions: {
      field: string;
      direction: number;
      priority: number;
    }[];
    filteringOptions: {
      field: string;
      operator: number;
      value: string;
    }[];
  };
  customerId: number;
}

export const FetchCustomerStoreCredits = async (payload: {
  storeId: number;
  customerId: number;
}): Promise<StoreCreditResponse> => {
  const url = `StoreCustomer/getcustomerwalletbalance/${payload.storeId}/${payload.customerId}.json`;

  const response = await SendAsync<StoreCreditResponse>({
    url: url,
    method: 'GET',
  });

  return response;
};

export const FetchStoreCredit = async (
  payload: StoreCreditPayload,
): Promise<StoreCredit> => {
  const url = `StoreCustomerCredit/list.json`;

  const response = await SendAsync<StoreCredit>({
    url: url,
    method: 'POST',
    data: payload,
  });

  return response;
};
