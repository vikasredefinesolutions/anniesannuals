import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export interface GiftCardDetails {
  id: number;
  seName: string;
  storeId: number;
  name: string;
  description: string;
  shortDescription: string;
  ourCost: string;
  salePrice: string;
  sku: string;
  imageName: string;
  giftCardEnddate: string;
}

export const getGiftCardDetails = async (seName: string, storeId: number) => {
  try {
    const response = await SendAsync<GiftCardDetails>({
      url: `${apiRoutes.getGiftCardDetails}/${seName}/${storeId}.json`,
      method: 'GET',
    });
    return response;
  } catch (error) {
    throw error;
  }
};
