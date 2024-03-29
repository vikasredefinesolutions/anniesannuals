import { apiRoutes } from '@/api/apiRoutes';
import axiosClient from '@/api/axiosClient/axiosClient';
import { IUserDetails } from '@/shared/types/user';
import { SendAsync } from '@/shared/utils/axios';

export interface _UserInfo {
  name: string;
  customerRoleName: string;
  storeName: string;
  createdByName: null;
  modifiedByName: null;
  companyName: string;
  customerAddress: _AddressObj[];
  id: number;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  jobTitle: string;
  companyId: number;
  tierId: number;
  isRegistered: number;
  storeId: number;
  sharedCustomerId: number;
  isLocked: boolean;
  navCustomerId: string;
  isSuperuser: boolean;
  customerType: string;
  isTaxableuser: boolean;
  industryId: number;
  customerRoleId: number;
  birthDate: string | null;
  gender: string;
  isForceAdminForResetPassword: boolean;
  memberFrom: number;
  memberTo: number;
  organizationId: number;
  primaryColor: string;
  mascotId: string;
  teamGender: string;
  timeOfYearPurchase: string;
  position: string;
  organizationName: string;
  primarySport: number;
  isCustomerPersonalization: null;
  leadUrl: null;
  sessionId: string;
  language: null;
  currency: string;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
}

export interface _AddressObj {
  id: number;
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
  createdDate: string | null;
  createdBy: string | null;
  modifiedDate: string | null;
  modifiedBy: string | null;
  rowVersion: string;
  location: string | null;
  ipAddress: string | null;
  macAddress: string | null;
}

export const getUserDetailsById = async (userId: string | number) => {
  try {
    const url = `/StoreCustomer/get/${userId}.json`;
    const res = await SendAsync<IUserDetails>({
      url,
      method: 'GET',
    });
    return res;
  } catch (error) {
    return null;
  }
};
