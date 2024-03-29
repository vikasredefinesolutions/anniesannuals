import storeDetails from '@/staticData/storeDetails.json';
import { getCookie } from 'cookies-next';
import { Maybe } from 'yup';

export const USER_ID_COOKIE = 'user_id';
export const USER_DETAILS_COOKIE = 'user_details';
export const EMP_EMAIL_COOKIE = 'emp_email';
export const EMP_ID_COOKIE = 'emp_id';
export const STORE_ID_COOKIE = 'store_id';
export const TEMPUSER_ID = 'temp_user_id';

export interface IUserCookie {
  firstName: string;
  lastName: string;
  email: string;
  isRegistered: boolean;
  password: string;
  phone: string;
  securityQuestionMasterId: number;
  customerSecurityQuestionAnswer: string;
}

export const getStoreId = (): number => {
  const cookie =
    getCookie(STORE_ID_COOKIE) || JSON.stringify(storeDetails?.storeId);
  if (!cookie) throw new Error('StoreId not found in cookie');
  //
  const storeId: undefined | number = JSON.parse(cookie);
  if (!storeId || storeId === 0)
    throw new Error('Invalid StoreId found in cookie');
  return storeId;
};

export const getShippingType = (): number => {
  const shippingChargeType = JSON.stringify(storeDetails?.shippingChargeType);
  return JSON.parse(shippingChargeType) || 5;
};

export const getUserId = (): Maybe<number> => {
  const userId = getCookie(USER_ID_COOKIE);
  if (userId) return +JSON.parse(userId);
  return null;
};

export const getTempUserId = (): Maybe<number> => {
  const tempId = getCookie(TEMPUSER_ID);
  if (tempId) return +JSON.parse(tempId);
  return null;
};

export const getUserDetails = (): Maybe<IUserCookie> => {
  const user = getCookie(USER_DETAILS_COOKIE);
  if (user) return JSON.parse(user);
  return null;
};

export const getEmployeeId = (): Maybe<number> => {
  const empId = getCookie(EMP_ID_COOKIE);
  if (empId) return JSON.parse(empId);
  return null;
};

export const getEmployeeEmail = (): Maybe<string> => {
  const empEamil = getCookie(EMP_EMAIL_COOKIE);
  if (empEamil) return JSON.parse(empEamil);
  return null;
};

export const getStoreCode = () => {
  return 'mz';
};
export const getPaymentOptions = () => {
  const paymentOptions = storeDetails.storeXPaymetnOptionListViewModels;
  return paymentOptions;
};
