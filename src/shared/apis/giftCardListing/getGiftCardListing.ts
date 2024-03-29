import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export interface GetGiftCard {
  productId: number;
  seName: string;
  storeId: number;
  name: string;
  description: string;
  shortDescription: string;
  ourCost: string;
  salePrice: string;
  sku: string;
  image: string;
  giftCardEnddate: string;
}
export const getGiftCardListing = async (payload: any) => {
  try {
    const response = await SendAsync<GetGiftCard[]>({
      url: `${apiRoutes.getGiftCardListing}`,
      method: 'POST',
      data: payload,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
