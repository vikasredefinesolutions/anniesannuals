import { SendAsync } from '@/shared/utils/axios';

export interface GetShippingmethod {
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

export const GetShippingmethod = async (payload: GetShippingmethod) => {
  try {
    const url = 'Store/GetShippingmethod';

    const res = await SendAsync<{ name: string; price: number }[]>({
      url: url,
      method: 'POST',
      data: payload,
    });
    return res;
  } catch (error: any) {
    throw new Error(error?.message || 'Something went wrong in shipping method')
  }
};
