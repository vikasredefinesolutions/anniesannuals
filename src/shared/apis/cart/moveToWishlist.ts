import { SendAsync } from '@/shared/utils/axios';

export type StoreproductWishListModel = {
  id: number;
  rowVersion: string;
  location: string;
  ipAddress: string;
  macAddress: string;
  customerId: number;
  productId: number | undefined;
  quantity: number;
  name: string | undefined;
  color: string;
  price: number | undefined;
  recStatus: string;
  // attributeColorOptionId: number;
  // attributeColorOptionValue: string;
  // attributeSizeOptionId: number;
  // attributeSizeOptionValue: string;
};

export type WishlistRequest = {
  storeproductWishListModel: StoreproductWishListModel;
};

export const moveToWishlist = async (payload: WishlistRequest) => {
  const url = '/StoreProductWishList/createstoreproductwishlist.json';
  const res = await SendAsync<StoreproductWishListModel>({
    url: url,
    method: 'POST',
    data: payload,
  });

  return res;
};
