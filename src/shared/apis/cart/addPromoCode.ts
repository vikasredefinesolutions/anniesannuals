import { SendAsync } from '@/shared/utils/axios';

export interface AddPromoCodeReq {
  promotionsModel: {
    customerId: number;
    couponCode: string;
    storeId: number;
    taxCost: number;
    shippingCost: number;
  };
}

export type AddPromoCodeResponse = {
  success: boolean;
  data: {
    couponCode: string;
    percentage: string;
    discountAmount: string;
    isFreeShipping: boolean;
    taxCost: string;
    shiipingCost: string;
  };
  otherData: null;
  errors: { [key: string]: string };
};

export const addPromoCode = async (
  req: AddPromoCodeReq,
): Promise<AddPromoCodeResponse['data']> => {
  const url = `/Store/CouponCode/GetCouponDetails.json`;

  const res = await SendAsync<AddPromoCodeResponse['data']>({
    url: url,
    method: 'POST',
    data: req,
  });
  return res;
};
