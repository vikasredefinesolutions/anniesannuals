import { SendAsync } from '@/shared/utils/axios';

export const updateCustomerKlaviyo = async (
  payload: IUpdateCustomerPreferencePayload,
) => {
  const url = `/StoreCustomer/updatecustomeruserpreferencesubscribeunsubscribe.json`;

  const res = await SendAsync<any>({
    url: url,
    method: 'POST',
    data: payload,
  });
  return res;
};

export interface IUpdateCustomerPreferencePayload {
  storeId: number;
  email: string;
  customerId: number;
  firstName: string;
  lastName: string;
  customerPhoneNumber: string;
  isUnSubscribeMarketingEmail: boolean;
  isUnSubscribeAllSms: boolean;
  isDoNotShareMyDetailsAnyOne: boolean;
  isEmailLocalEventsHappeningInNursey: boolean;
}
