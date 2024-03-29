import { SendAsync } from '@/shared/utils/axios';

export interface _ForgetCustomerPassword {
  email: string;
  storeId: number;
}
export interface _ForgetCustomerPassword_Res {
  issend: boolean;
}

export const ForgetCustomerPassword = async (
  payload: _ForgetCustomerPassword,
) => {
  try {
    const url = `/StoreCustomer/customerchangepasswordlink/${payload.storeId}/${payload.email}.json`;

    const res: _ForgetCustomerPassword_Res = await SendAsync({
      url: url,
      method: 'GET',
    });
    return res;
  } catch (error) {
    return null;
  }
};
