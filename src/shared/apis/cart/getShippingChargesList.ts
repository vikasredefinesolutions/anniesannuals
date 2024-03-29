import { SendAsync } from '@/shared/utils/axios';

export type ShippingChargeListResponse = {
  id: number;
  orderTotalMin: number;
  orderTotalMax: number;
  charge: number;
  storeId: number;
  isPercentage: null;
  recStatus: string;
  createdDate: string;
  createdBy: number;
  modifiedDate: string;
  modifiedBy: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
};
export interface _GetShippingmethod {
  shippingMethodModel: {
    city: string | undefined;
    state: string | undefined;
    country: string | undefined;
    zipCode: string | undefined;
    customerID: number | string | null;
    storeId: string | number;
    ordertotalwithoutshipppingcharge: number | string;
    shippingType: number;
  };
}

export const getShippingChargeList = async (
  storeId: number,
): Promise<ShippingChargeListResponse[]> => {
  const url = `ShippingCharges/list`;
  const res = await SendAsync<ShippingChargeListResponse[]>({
    url: url,
    data: {
      storeId,
    },
    method: 'POST',
  });
  return res;
};

export const GetShippingmethod = async (payload: _GetShippingmethod) => {
  const url = 'Store/GetShippingmethod';
  try {
    const res = await SendAsync<{ name: string; price: number }[]>({
      url: url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error: any) {
    throw new Error(error?.message || 'Something went worng in shipping method')
  }
};
