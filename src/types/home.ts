export interface HeaderDetails {
  logoUrl: string;
}

export interface VisibleComponents {
  id: number;
  no: string;
  uuid: string;
  content: string;
  name: string;
  image: string;
  html: string;
  properties: any;
  visibility: 'on' | 'off';
  selectedVal: any;
  cacheHTMl: string;
  cleanHTMl: string | null;
}

export interface ShowCategoryValue {
  id: number;
  productId?: number;
  sizes?: string;
  name: string;
  image: string;
  imageAltTag: string;
  seName: string | null;
  customcollectionurl: string;
  customFields: CustomFields[];
  productReviewsCount: string;
  iswishlist?: boolean;
  wishListId?: number;
  productTagViewModel: Array<{
    productId: number;
    imagename: string;
    productTagName: string;
    tagPosition: string;
  }>;
  msrp: string;
  salePrice: string;
  brandName: string;
  productRatingAverage: string;
  quantity?: number;
  slideLink?: string;
  inventory?: number;
}

export interface ShowCategoryCropValue {
  id: number;
  name: string;
  image: string;
  imageAltTag: string;
  seName: string | null;
  customFields: CustomFields[];
  brandName: string;
  review: string;
  price: string;
}

interface CustomFields {
  label: string;
  value: string;
}
export interface ShowCartCategoryValue {
  id: number;
  name: string;
  image: string;
  imageAltTag: string;
  brandName: string;
  review: string;
  price: string;
  availableItems: number;
}
