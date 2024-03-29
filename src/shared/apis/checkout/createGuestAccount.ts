import { SendAsync } from '@/shared/utils/axios';

export interface _CreateNewAccount_Payload_without {
  storeCustomerGuestModel: {
    id: number;
    email: string | undefined;
    password: string;
    confirmPassword: string;
    storeId: number | string;
    recStatus: string;
  };
}

export interface _AccCreated_without {
  item1: {
    id: number;
    email: string;
    password: string;
    confirmPassword: string;
    storeId: number | string;
    recStatus: string;
  };
  item2: string;
}

export const createGuestAccount = async (
  payload: _CreateNewAccount_Payload_without,
): Promise<_AccCreated_without> => {
  const url = `/StoreCustomer/storecustomercreateguest.json`;
  const res = await SendAsync<_AccCreated_without>({
    url: url,
    method: 'POST',
    data: payload,
  });

  return res;
};
