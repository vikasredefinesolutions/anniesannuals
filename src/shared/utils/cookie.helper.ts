import { getCookie } from 'cookies-next';
import { IGrowingZone } from '../apis/common/common';
import storeDetails from '@/staticData/storeDetails.json';
import { IPaymentOptions } from '../apis/store/getStoreDetails';

export const USER_ID = 'user_id';
export const USER_DETAILS = 'user_details';
export const TEMPUSER_ID = 'temp_user_id';
export const GROWING_ZONE = 'growing_zone';
export const STORE_ID = 'store_id';
export const EMP_EMAIL = 'emp_email';
export const EMP_ID = 'emp_id';

export interface IUserCookie {
  firstName: string;
  lastName: string;
  email: string;
  isRegistered: boolean;
}

export const getUserId = () => {
  const userId = getCookie(USER_ID);
  if (userId) return +JSON.parse(userId);
  return 0;
};

export const getUserDetails = (): IUserCookie | null => {
  const user = getCookie(USER_DETAILS);
  if (user) return JSON.parse(user);
  return null;
};
export const getTempUserId = () => {
  const tempId = getCookie(TEMPUSER_ID);
  if (tempId) return tempId;
  return 0;
};

export const getGrowingZone = (): IGrowingZone | null => {
  const growingZone = getCookie(GROWING_ZONE);
  if (growingZone) return JSON.parse(growingZone);
  return null;
};

export const getStoreId = (): number => {
  const storeId: number = storeDetails?.storeId;
  if (!storeId || storeId === 0) throw new Error('No StoreId found in cookie');
  return storeId;
};

export const getShippingType = (): number => {
  const shippingChargeType: number = storeDetails?.shippingChargeType || 0;
  return shippingChargeType;
};

export const getPaymentOptions = () => {
  const paymentOptions: IPaymentOptions[] =
    (storeDetails.storeXPaymetnOptionListViewModels as IPaymentOptions[]) || [];
  return paymentOptions;
};

export const getEmployeeId = () => {
  const empId = getCookie(EMP_ID);
  if (empId) return JSON.parse(empId);
  return null;
};

export const getEmployeeEmail = () => {
  const empEamil = getCookie(EMP_EMAIL);
  if (empEamil) return JSON.parse(empEamil);
  return null;
};
