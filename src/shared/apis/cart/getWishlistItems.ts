import { SendAsync } from '@/shared/utils/axios';
import { WishlistType } from './removeFromWishlist';


export const getWishlist = async (customerId: number) => {
  const url = `/StoreProductWishList/getwishlistbycustomerid/${customerId}.json`;
  const res = await SendAsync<WishlistType[]>({
    url: url,
    method: 'GET',
  });

  return res;
};
