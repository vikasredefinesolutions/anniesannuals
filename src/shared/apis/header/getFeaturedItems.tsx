import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

interface _GetFeaturedItemsInput {
  sename: string;
  type: string;
  storeId: number;
  maximumItemsForFetch: number;
  tagName: string;
}

type MoreImagesObj = {
  id: number;
  attributeOptionID: number;
  attributeOptionName: string;
  imageUrl: string;
  displayOrder: number;
  altTag: string;
};

type CustomFields = {
  value: string;
  label: string;
};

export type _GetfeaturedItemsOutput = {
  productId: number;
  productName: string;
  productSEName: string;
  ourCost: string;
  msrp: string;
  imap: string;
  salePrice: string;
  productDisplayOrder: 0;
  imageUrl: string;
  productBrandLogo: string;
  brandLogoUrl: string;
  blackAndWhiteLogoUrl: string;
  brandName: string;
  brandSename: string;
  discountPercentage: number;
  isCallUsForPriceManufacture: boolean;
  isShowavailability: boolean;
  isSpecialBrand: boolean;
  lowPrice: number;
  splitproductList: null | [];
  productTagViewModel: [];
  moreImages: MoreImagesObj[];
  productReviewsCount: number;
  productRatingAverage: string;
  customFields: CustomFields[];
};

export const getFeaturedProductItemsBySeName = async (
  payload: _GetFeaturedItemsInput,
) => {
  const res = await SendAsync<_GetfeaturedItemsOutput[]>({
    url: apiRoutes.getFeaturedProductItems,
    method: 'POST',
    data: payload,
  });
  return res;
};
