import { apiRoutes } from '@/api/apiRoutes';
import { SendAsync } from '@/shared/utils/axios';

export interface _SearchInput {
  storeId: number;
  content: string;
  isFull: boolean;
  isDiscontinue: boolean;
  hoverCount: number;
}

export interface _AttributeImageList {
  id: number;
  attributeOptionID: string;
  attributeOptionName: string;
  attributeImage: string;
}

export interface _CustomField {
  value: string;
  label: string;
}

export interface _ProductReviewRatingViewModel {
  totalRatingCount: number;
  ratingAverage: string;
  fiveStarRatingCount: number;
  fourStarRatingCount: number;
  threeStarRatingCount: number;
  twoStarRatingCount: number;
  oneStarRatingCount: number;
  qualityOfProduct: string;
  valueOfProduct: string;
  easyOfUse: string;
}

export interface _GetSearchInput {
  sename: string;
  productCustomFields: { label: string; value: string }[] | undefined;
  getProductImageOptionList: any;
  productRatingAverage: string | number | undefined;
  productReviewsCount: number;
  productFirstImage: string;
  isDiscontinued: boolean;
  avaliblity: boolean;
  avaliableState: string | null;
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
  productReviewRatingViewModel: _ProductReviewRatingViewModel;
  id: number;
  name: string;
  description: string | null;
  ourSku: string | null;
  ourCost: number;
  msrp: number;
  imap: number;
  salePrice: number;
  lowPrice: number;
  seName: string;
  getAttributeImageLists: _AttributeImageList[] | null;
  customFields: Array<{ label: string; value: string }>;
}

export const getGlobalSearchInput = async (payload: _SearchInput) => {
  const res = await SendAsync<_GetSearchInput[]>({
    url: apiRoutes.fetchSearchInput,
    method: 'POST',
    data: payload,
  });
  return res;
};
