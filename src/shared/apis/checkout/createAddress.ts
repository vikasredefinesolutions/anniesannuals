import { SendAsync } from '@/shared/utils/axios';
import { AddressAPIRequest } from './updateAddress';

export interface _CreateUserAddressRes {
  customerId: number;
  firstname: string;
  lastName: string;
  companyName: string;
  email: string;
  address1: string;
  address2: string;
  suite: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  fax: string;
  countryName: string;
  countryCode: string;
  addressType: string;
  isDefault: boolean;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export const CreateUserAddress = async (request: AddressAPIRequest) => {
  const url = `/StoreCustomer/storecustomercreateaddress.json`;
  const res: _CreateUserAddressRes = await SendAsync<_CreateUserAddressRes>({
    url: url,
    method: 'POST',
    data: request,
  });

  return res;
};
