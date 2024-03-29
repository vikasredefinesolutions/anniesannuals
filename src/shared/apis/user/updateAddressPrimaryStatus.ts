import { SendAsync } from '@/shared/utils/axios';

export const udpateIsDefaultAddress = async (payload: {
  isDefault: boolean;
  addressId: number;
  customerId: number;
  addressType: string;
}) => {
  const url = '/StoreCustomer/setcustomeraddressdefault.json';

  const res = await SendAsync<boolean>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};
