import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';
import { IGiftCard } from '@/stores/annies/shared/Home/Cards/GiftCard';

export const getCustomerGiftCardOrVoucher = async (
  customerId: number,
  storeId: number,
) => {
  try {
    const response = await SendAsync<IGiftCard[]>({
      url: `${apiRoutes.getAllGiftCards}/${customerId}/${storeId}.json`,
      method: 'GET',
    });
    return response;
  } catch (error) {
    throw error;
  }
};
