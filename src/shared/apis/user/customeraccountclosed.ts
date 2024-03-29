import { SendAsync } from "@/shared/utils/axios";

export interface _AccountClose{
  customerId: number | undefined,
  isUnsubscribe: boolean,
  isConfirmCloseMyAccount: boolean,
  deleteUnsubscribeEmailToken: string | undefined 
}

export interface _UnSubscribeEmail {
  otpExpirySeconds: number,
  result:boolean
}

export const updatecustomeraccountclosed = async (payload: _AccountClose) => {
  try {
    const url = `/StoreCustomer/updatecustomeraccountclosed.json`;
    const res = await SendAsync<any>({
      url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const deleteAccountAndUnscribeEmail = async (userId: number) => {
  try {
    const url = `/StoreCustomer/sendauthtokenfordeleteaccountandunscribeemail/${userId}.json`;
    const res = await SendAsync<_UnSubscribeEmail>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error) {
    return null;
  }
};