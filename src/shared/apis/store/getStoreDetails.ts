import { SendAsync } from '@/shared/utils/axios';

export interface IPaymentOptions {
  paymentOptionId: number;
  paymentOptionName: 'Credit Card' | 'Paypal';
  rowVersion: string;
  status: string;
}
export interface IStoreDetails {
  storeXPaymetnOptionListViewModels: IPaymentOptions[];
  id: number;
  storeId?: number;
  storeTypeId: number;
  storeType: StoreType;
  name: string;
  code: string;
  url: string;
  navCode: string;
  prefix: string;
  logoUrl: string;
  isLandingPage: boolean;
  isBlogPage: boolean;
  isReviewMaster: boolean;
  isSeoMarketing: boolean;
  isAttributeSaparateProduct: boolean;
  attributeid: number;
  isQuantityDiscount: boolean;
  isFirstLogoFree: boolean;
  isLinepersonalization: boolean;
  firstLineCharges: number;
  secondLineCharges: number;
  isProductReadinessAllow: boolean;
  isSeoReadinessAllow: boolean;
  isShippingCharge: boolean;
  isFreeShipping: boolean;
  generalAmount: number;
  punchoutMessage: string;
  checkOutRequiredThirdPartyLogin: boolean;
  domainBasedLogin: boolean;
  domainBasedLoginDesc: string;
  generalLogin: boolean;
  thirdPartyLogin: boolean;
  bothLogin: boolean;
  onlyGuestLogin: boolean;
  isBrandStore: boolean;
  storeBrandId: number;
  parentstoreid: number;
  billToCustomer: null;
  favicon: string;
  recStatus: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: Date;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  isSmallRun: boolean;
  smallRunLimit: number;
  smallRunFeesCharges: number;
  isLogoSetupCharges: boolean;
  logoSetupCharges: number;
  isSewOutEnable: boolean;
  sewOutCharges: number;
  firstLogoCharge: number;
  secondLogoCharge: number;
}

export type StoreType = {
  id: number;
  name: string;
  recStatus: string;
  createdDate: Date;
  createdBy: number;
  modifiedDate: null;
  modifiedBy: null;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
};

export const getStoreDetails = async (
  domain: string,
): Promise<IStoreDetails | null> => {
  const url = `Store/getstorebydomain.json`;
  try {
    const response = await SendAsync<IStoreDetails>({
      url: url,
      method: 'POST',
      data: { url: domain },
    });
    return response;
  } catch (error) {
    return null;
  }
};
