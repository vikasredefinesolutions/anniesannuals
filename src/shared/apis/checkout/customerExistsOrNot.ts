import { SendAsync } from '@/shared/utils/axios';

export interface CheckCustomerAlreadyExistResponse {
  id: number;
  isCustomerExist: boolean;
  isGuestCustomer: boolean;
}

export const checkCustomerAlreadyExist = async (
  email: string,
  storeId: number,
): Promise<CheckCustomerAlreadyExistResponse> => {
  const url = `/StoreCustomer/checkstorecustomerguest.json`;
  const res = await SendAsync<CheckCustomerAlreadyExistResponse>({
    url: url,
    method: 'POST',
    data: {
      email: email,
      storeId: storeId,
    },
  });

  return res;
};
