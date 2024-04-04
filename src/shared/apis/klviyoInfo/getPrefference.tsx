import { SendAsync } from '@/shared/utils/axios';

export const getCustomerPreference = async (storeId: string, email: string) => {
  const url = `/StoreCustomer/getcustomeruserpreferencesubscribeunsubscribe/${storeId}/${email}.json`;

  const res = await SendAsync<IOrderDetailPreference>({
    url: url,
    method: 'GET',
  });
  return res;
};

export interface IOrderDetailPreference {
  id: number;
  storeId: number;
  customerId: number;
  firstname: string;
  lastName: string;
  email: string;
  customerPhoneNumber: string;
  klaviyoProfileId: string;
  isUnSubscribeMarketingEmail: boolean;
  isUnSubscribeAllSms: boolean;
  isDoNotShareMyDetailsAnyOne: boolean;
  isEmailLocalEventsHappeningInNursey: boolean;
  isRemoveFromPhysicalMailing: boolean;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string | null;
  modifiedBy: string | null;
  rowVersion: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
}
