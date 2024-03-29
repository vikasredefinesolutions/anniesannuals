import { SendAsync } from '@/shared/utils/axios';
import { _CreateUserAddressRes } from './createAddress';

export interface StoreCustomerAddressModel {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  customerId: number;
  firstname: string;
  lastName: string;
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
  companyName: string;
  addressType: string;
  isDefault: boolean;
  recStatus: string;
}

export interface AddressAPIRequest {
  storeCustomerAddressModel: StoreCustomerAddressModel;
}

export const UpdateUserAddress = async (request: AddressAPIRequest) => {
  const url = `/StoreCustomer/updatestorecustomeraddress.json`;
  const res: _CreateUserAddressRes = await SendAsync<_CreateUserAddressRes>({
    url: url,
    method: 'POST',
    data: request,
  });
  return res;
};
