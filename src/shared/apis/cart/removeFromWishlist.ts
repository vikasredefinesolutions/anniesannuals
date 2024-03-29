import { SendAsync } from '@/shared/utils/axios';

export type WishlistType = {
  id: number;
  customerId: number;
  productId: number;
  quantity: number;
  productName: string;
  color: string;
  price: number;
  colorLogoUrl: string;
  seName: string;
  productReviewsCount: number;
  productRatingAverage: string;
  customFields: CustomFields[];
};

type CustomFields = {
  value: string;
  label: string;
};

export const removeWishlist = async (wishlistId: number) => {
  const url = '/StoreProductWishList/deletewishlistbyid.json';
  const res = await SendAsync<WishlistType[]>({
    url: url,
    method: 'POST',
    data: { wishlistId },
  });

  return res;
};
