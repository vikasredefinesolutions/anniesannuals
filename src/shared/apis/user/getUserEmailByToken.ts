import { SendAsync } from '@/shared/utils/axios';

export const GetEmailByResetToken = async (payload: {
  token: string;
  storeId: number;
}): Promise<string | 'INVALID_TOKEN'> => {
  const url = `StoreCustomer/GetCustomerEmailByToken/${payload.storeId}/${payload.token}.json`;

  const response = await SendAsync<any>({
    url: url,
    method: 'GET',
  });

  if (response === '') {
    return 'INVALID_TOKEN';
  }

  return response;
};
