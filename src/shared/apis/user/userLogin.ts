import { SendAsync } from '@/shared/utils/axios';

export const userLogin = async (payload: {
  storeId: number;
  password: string;
  userName: string;
}) => {
  const url = 'StoreCustomer/customerlogin.json';
  const response = await SendAsync<number>({
    url,
    method: 'POST',
    data: payload,
  });

  return response;
};
